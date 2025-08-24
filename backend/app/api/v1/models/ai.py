from pydantic import BaseModel
from app.ai.enums import AIProvider

class AiRequest(BaseModel):
    prompt: str
    aiprovider: AIProvider

class AiResponse(BaseModel):
    response: str