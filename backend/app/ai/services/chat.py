from app.ai.clients.base import AIClient
from typing import List, Dict, Optional

class ChatService:
    def __init__(self, client: AIClient):
        self.client = client

    def chat(self, prompt: str, history: Optional[List[Dict]] = None) -> tuple[str, list[dict]]:
        return self.client.generate_text(prompt, history)

