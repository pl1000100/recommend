from app.ai.clients.base import AIClient
from typing import List, Dict, Optional
import logging

logger = logging.getLogger(__name__)


class ChatService:
    def __init__(self, client: AIClient):
        self.client = client

    async def chat(
        self, prompt: str, history: Optional[List[Dict]] = None
    ) -> tuple[str, list[dict]]:
        logger.debug(
            f"Chat service called with prompt: {prompt} and history: {history}"
        )
        try:
            return await self.client.generate_text(prompt, history)
        except Exception as e:
            logger.error(f"Error generating text: {e}")
            raise e
