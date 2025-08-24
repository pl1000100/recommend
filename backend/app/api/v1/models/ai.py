from pydantic import BaseModel, field_validator
from app.ai.enums import AIProvider


class AIRequest(BaseModel):
    prompt: str
    aiprovider: AIProvider
    history: list[dict] = None

    @field_validator("history")
    def validate_history(cls, v):
        if v is not None:
            for item in v:
                if hasattr(item, "role") and hasattr(item, "parts"):
                    if not isinstance(item.parts, list):
                        raise ValueError("Invalid history item")
        return v

class AIResponse(BaseModel):
    response: str
    history: list[dict]


#     content=Content(
#     parts=[
#       Part(
#         text="""Hello! How can I help you today?
# """
#       ),
#     ],
#     role='model'
#   ),