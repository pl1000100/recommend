from fastapi import APIRouter, HTTPException, Request
from app.api.v1.models import (
    CreateItemRequest,
    CreateItemResponse,
    GetItemsResponse,
    Item,
    AIRequest,
    AIResponse,
    AIOutfitRequest,
    AIOutfitResponse,
)
from app.ai.services import ChatService
import logging
from app.config import app_config
from app.ai.clients import GeminiClient
from app.ai.enums import AIProvider
from app.core import limiter
import app.db.repositories as db_repo
import app.db.models as db_models

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/items", response_model=GetItemsResponse)
@limiter.limit(app_config.rate_limit.slowapi_default)
async def get_items(request: Request):
    logger.info("Getting items")
    logger.debug("Getting items")
    items = db_repo.get_items()
    logger.critical(f"Items: {items}")
    response = []
    for item in items:
        response.append(Item(id=item.id, name=item.name, description=item.description, category=item.category, created_at=item.created_at, updated_at=item.updated_at))
    return GetItemsResponse(items=response)

@router.post("/items", response_model=CreateItemResponse)
@limiter.limit(app_config.rate_limit.slowapi_default)
async def create_item(request: Request, item: CreateItemRequest):
    logger.info(f"Creating item: {item.name}")
    logger.debug(f"Item: {item}")

    try:
        item = db_models.Item(name=item.name, description=item.description, category=item.category)
        
        try:
            db_repo.create_item(item)
        except Exception as e:
            logger.error(f"Error creating item: {e}")
            raise HTTPException(status_code=500, detail="Failed to create item")

        response = CreateItemResponse(
            id=item.id,
            name=item.name,
            description=item.description,
            category=item.category
        )
        
        logger.info(f"Item created successfully with ID: {item.id}")
        return response
        
    except Exception as e:
        logger.error(f"Error creating item: {e}")
        raise HTTPException(status_code=500, detail="Failed to create item")


@router.post("/ai", response_model=AIResponse)
@limiter.limit(app_config.rate_limit.slowapi_ai)
async def ai(request: Request, body: AIRequest):
    logger.info(f"AI request to {body.aiprovider}")
    logger.debug(f"AI request: {body}")
    try:
        # TO-DO: Add other clients
        if body.aiprovider == AIProvider.GEMINI:
            chat = ChatService(GeminiClient(app_config.gemini))
            response, history = await chat.chat(body.prompt, body.history)
        else:
            raise ValueError(f"Unsupported AI provider: {body.aiprovider}")

    except ValueError as e:
        logger.error(f"AI request failed: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error in AI request: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

    return AIResponse(response=response, history=history)

@router.post("/ai/outfit", response_model=AIOutfitResponse)
@limiter.limit(app_config.rate_limit.slowapi_ai)
async def ai_outfit(request: Request, body: AIOutfitRequest):
    logger.info(f"AI request to {body.aiprovider}")
    logger.debug(f"AI request: {body}")
    try:
        # TO-DO: Add other clients
        prompt = f"Generate an outfit from the following items: {body.selectedItems}. Additional instructions: {body.additionalInstructions}"
        if body.aiprovider == AIProvider.GEMINI:
            chat = ChatService(GeminiClient(app_config.gemini))
            response, history = await chat.chat(prompt, None)
        else:
            raise ValueError(f"Unsupported AI provider: {body.aiprovider}")

    except ValueError as e:
        logger.error(f"AI request failed: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error in AI request: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

    return AIOutfitResponse(response=response, history=history)

@router.get("/ai/providers", response_model=list[str])
@limiter.limit(app_config.rate_limit.slowapi_default)
async def get_ai_providers(request: Request):
    logger.info("Getting AI providers")
    return AIProvider.get_all_providers()
