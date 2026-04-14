import os
import io
import wave
import base64
import time
import logging

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from google import genai
from google.genai import types
from langchain_core.messages import HumanMessage, AIMessage

from graph import graph

# -------- LOAD ENV --------
load_dotenv()

# -------- LOGGING --------
logging.basicConfig(level=logging.INFO)

# -------- APP --------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- INPUT MODEL --------
class ChatInput(BaseModel):
    message: str | None = None
    apiKey: str | None = None
    history: list | None = []   # 👈 frontend se pass karo


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

    state = {
        "messages": messages,
        "apiKey": api_key
    }

    try:
        for event in graph.stream(state, stream_mode="values"):
            logging.info(f"Graph event: {event}")

            if "messages" in event:
                last_msg = event["messages"][-1]

                if isinstance(last_msg, AIMessage):
                    final_ai_message = last_msg

    except Exception as e:
        logging.error(f"Graph Error: {e}")
        raise HTTPException(status_code=500, detail="Graph failed")

    return final_ai_message


# -------- VOICE --------
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

        part = response.candidates[0].content.parts[0]
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
        logging.error(f"TTS Error: {e}")
        return None


# -------- SINGLE ENDPOINT --------
@app.post("/interview")
def interview(input: ChatInput):

    start_time = time.time()

    # ✅ API KEY FIX
    api_key = input.apiKey or os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise HTTPException(status_code=400, detail="API key missing")

    logging.info("Request received")

    # ✅ build messages from frontend history
    messages = []

    if input.history:
        for msg in input.history:
            if msg["role"] == "user":
                messages.append(HumanMessage(content=msg["content"]))
            else:
                messages.append(AIMessage(content=msg["content"]))

    # first message
    if not messages:
        messages.append(
            HumanMessage(content="Start the interview and ask the first question.")
        )

    elif input.message:
        messages.append(HumanMessage(content=input.message))

    # -------- AI --------
    ai_message = get_ai_response(messages, api_key)

    if not ai_message:
        raise HTTPException(status_code=500, detail="AI failed")

    ai_text = extract_text(ai_message.content)

    # -------- TTS --------
    client = genai.Client(api_key=api_key)

    audio_base64 = None

    for i in range(2):   # 👈 reduced retries to avoid timeout
        audio_base64 = generate_voice(ai_text, client)
        if audio_base64:
            break
        time.sleep(0.5)

    end_time = time.time()

    logging.info(f"Response time: {end_time - start_time:.2f}s")

    return {
        "text": ai_text,
        "audio": audio_base64 if audio_base64 else ""
    }


# -------- RUN --------
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)