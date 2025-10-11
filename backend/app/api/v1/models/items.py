from pydantic import BaseModel, field_validator


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
