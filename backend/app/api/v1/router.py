from fastapi import APIRouter
from app.api.v1.models import (
    CreateItemRequest,
    CreateItemResponse,
    AIRequest,
    AIResponse
)
from app.ai.services import ChatService
import logging
from app.config import app_config
from app.ai.clients import GeminiClient
from app.ai.enums import AIProvider


logger = logging.getLogger(__name__)
logger.setLevel(app_config.logging.level)

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Hello, World!"}

@router.post("/items", response_model=CreateItemResponse)
async def create_item(item: CreateItemRequest):
    logger.info(f"Creating item: {item}")

    # TODO: Create item in database
    # TODO: Return item id

    logger.critical(f"Not implemented: Create item in database")

    return CreateItemResponse(id=1, name="Item 1", type="Item 1")

@router.post("/ai", response_model=AIResponse)
async def ai(request: AIRequest):
    logger.info(f"AI request: {request}")
    # TO-DO: Add other clients
    if request.aiprovider == AIProvider.GEMINI:
        chat = ChatService(GeminiClient(app_config.gemini))
        response, history = await chat.chat(request.prompt, request.history)
    else:
        raise ValueError(f"Unsupported AI provider: {request.aiprovider}")

    return AIResponse(response=response, history=history)



@router.get("/ai/providers", response_model=list[str])
async def get_ai_providers():
    return AIProvider.get_all_providers()