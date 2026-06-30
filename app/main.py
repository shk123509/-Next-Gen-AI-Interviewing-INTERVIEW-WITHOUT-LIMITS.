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

load_dotenv()
logging.basicConfig(level=logging.INFO)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatInput(BaseModel):
    message: str | None = None
    apiKey: str | None = None
    history: list | None = []

# 👈 New payload model for separate TTS tracking
class TTSInput(BaseModel):
    text: str
    apiKey: str | None = None


def extract_text(content):
    if isinstance(content, str): return content
    if isinstance(content, list):
        text = ""
        for part in content:
            if isinstance(part, dict) and part.get("type") == "text":
                text += part.get("text", "")
        return text
    return str(content)


def get_ai_response(messages, api_key):
    final_ai_message = None
    state = {"messages": messages, "apiKey": api_key}
    try:
        events = list(graph.stream(state, stream_mode="values"))
        if events and "messages" in events[-1]:
            last_msg = events[-1]["messages"][-1]
            if isinstance(last_msg, AIMessage):
                final_ai_message = last_msg
    except Exception as e:
        logging.error(f"Graph Error: {e}")
        raise HTTPException(status_code=500, detail="Graph failed")
    return final_ai_message


# -------- FAST INTERVIEW ENDPOINT (RETURNS TEXT IMMEDIATELY) --------
@app.post("/interview")
def interview(input: ChatInput):
    api_key = input.apiKey or os.getenv("GEMINI_API_KEY")
    if not api_key: raise HTTPException(status_code=400, detail="API key missing")

    messages = []
    if input.history:
        for msg in input.history:
            msg_content = msg.get("text") or msg.get("content") or ""
            if not msg_content.strip(): continue
            messages.append(HumanMessage(content=str(msg_content)) if msg.get("role") == "user" else AIMessage(content=str(msg_content)))

    if not messages:
        messages.append(HumanMessage(content=input.message if input.message else "Start the interview and ask the first question."))
    elif input.message and messages[-1].content != input.message:
        messages.append(HumanMessage(content=input.message))

    ai_message = get_ai_response(messages, api_key)
    if not ai_message: raise HTTPException(status_code=500, detail="AI failed")

    return {"text": extract_text(ai_message.content)}


# -------- SEPARATE BACKGROUND TTS ENDPOINT --------
@app.post("/tts")
def tts_endpoint(input: TTSInput):
    api_key = input.apiKey or os.getenv("GEMINI_API_KEY")
    if not api_key: raise HTTPException(status_code=400, detail="API key missing")
    
    try:
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model="gemini-2.5-flash-preview-tts",
            contents=input.text,
            config=types.GenerateContentConfig(
                response_modalities=["AUDIO"],
                speech_config=types.SpeechConfig(
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Algenib")
                    )
                ),
            ),
        )
        
        if not response.candidates: return {"audio": ""}
        pcm_audio = response.candidates[0].content.parts[0].inline_data.data
        
        buffer = io.BytesIO()
        with wave.open(buffer, "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(24000)
            wf.writeframes(pcm_audio)
        buffer.seek(0)
        
        return {"audio": base64.b64encode(buffer.read()).decode("utf-8")}
    except Exception as e:
        logging.error(f"TTS Engine Error: {e}")
        return {"audio": ""}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 10000)))