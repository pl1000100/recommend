from pydantic import BaseModel
from app.ai.enums import AIProvider
from typing import Optional


class AiRequest(BaseModel):
    prompt: str
    aiprovider: AIProvider
    history: list[dict] = None

class AiResponse(BaseModel):
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