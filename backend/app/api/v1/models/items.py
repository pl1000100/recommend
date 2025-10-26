from pydantic import BaseModel, field_validator
from datetime import datetime

class CreateItemRequest(BaseModel):
    name: str
    description: str = ""
    category: str

    @field_validator("name")
    def validate_name(cls, v):
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters long")
        return v


class CreateItemResponse(BaseModel):
    id: int
    name: str
    description: str
    category: str

class Item(BaseModel):
    id: int
    name: str
    description: str
    category: str
    created_at: datetime
    updated_at: datetime

class GetItemsResponse(BaseModel):
    items: list[Item]
