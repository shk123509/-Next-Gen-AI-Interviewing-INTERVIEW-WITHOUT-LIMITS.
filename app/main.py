
import os
import io
import wave
import base64
import time

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware


from google import genai
from google.genai import types
from langchain_core.messages import HumanMessage, AIMessage

from graph import graph


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

messages = []


class ChatInput(BaseModel):
    message: str | None = None
    apiKey: str | None = None 


# -------- TEXT EXTRACT --------

def extract_text(content):

    if isinstance(content, str):
        return content

    if isinstance(content, list):
        text = ""
        for part in content:
            if isinstance(part, dict) and part.get("type") == "text":
                text += part.get("text", "")
        return text

    return str(content)


# -------- AI RESPONSE --------

def get_ai_response(messages, api_key):

    final_ai_message = None

    # Proper state with API key
    state = {
        "messages": messages,
        "apiKey": api_key
    }

    # Pass full state to graph
    for event in graph.stream(state, stream_mode="values"):

        if "messages" in event:

            last_msg = event["messages"][-1]

            if isinstance(last_msg, AIMessage):
                final_ai_message = last_msg

    return final_ai_message


# -------- VOICE GENERATION --------

def generate_voice(text, client):

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash-preview-tts",
            contents=text,
            config=types.GenerateContentConfig(
                response_modalities=["AUDIO"],
                speech_config=types.SpeechConfig(
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=types.PrebuiltVoiceConfig(
                            voice_name="Algenib"
                        )
                    )
                ),
            ),
        )

        if not response.candidates:
            return None

        content = response.candidates[0].content

        if not content or not content.parts:
            return None

        part = content.parts[0]

        if not part.inline_data:
            return None

        pcm_audio = part.inline_data.data

        buffer = io.BytesIO()

        with wave.open(buffer, "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(24000)
            wf.writeframes(pcm_audio)

        buffer.seek(0)

        return base64.b64encode(buffer.read()).decode("utf-8")

    except Exception as e:

        print("Gemini TTS Error:", e)

        return None


# -------- INTERVIEW ENDPOINT --------

@app.post("/interview")

def interview(input: ChatInput):

    global messages

    if not messages:

        messages.append(
            HumanMessage(content="Start the interview and ask the first question.")
        )

    elif input.message:

        messages.append(HumanMessage(content=input.message))


    api_key = input.apiKey

    if not api_key:
        return {"error": "API key missing"}    

    ai_message = get_ai_response(messages, api_key=api_key)
    
    
    client = genai.Client(api_key=api_key)

    ai_text = extract_text(ai_message.content)

    messages.append(ai_message)

    # retry logic
    audio_base64 = None

    for i in range(3):

        audio_base64 = generate_voice(ai_text, client=client)

        if audio_base64:
            break

        time.sleep(1)

    return {
        "text": ai_text,
        "audio": audio_base64 if audio_base64 else ""
    }
