from fastapi import APIRouter
from app.api.v1.models import CreateItemRequest, CreateItemResponse
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/")
def root():
    return {"message": "Hello, World!"}

@router.post("/items", response_model=CreateItemResponse)
def create_item(item: CreateItemRequest):
    logger.info(f"Creating item: {item}")

    # TODO: Create item in database
    # TODO: Return item id

    logger.critical(f"Not implemented: Create item in database")

    return CreateItemResponse(id=1, name="Item 1", type="Item 1")