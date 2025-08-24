from google import genai
from typing import List, Dict, Optional
import logging
from app.config import app_config
from app.ai.clients.base import AIClient

logger = logging.getLogger(__name__)
logger.setLevel(app_config.logging.level)


class GeminiClient(AIClient):
    def __init__(self, gemini_config):
        self.client = genai.Client(api_key=gemini_config.api_key)
        self.model = gemini_config.model
    
    def generate_text(self, prompt: str, history: Optional[List[Dict]] = None) -> str:
        contents = [
            {
                "role": "user",
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
        
        if history:
            contents = history + contents
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=contents
            )
        except Exception as e:
            logger.error(f"Error generating text: {e}")
            raise e
        return response.text

    