from google import genai
from typing import List, Dict, Optional
import logging
from app.config import app_config
from app.ai.clients.base import AIClient

logger = logging.getLogger(__name__)
logger.setLevel(app_config.logging.level)


class GeminiClient(AIClient):
    def __init__(self, gemini_config):
        logger.info(f"Initializing Gemini client with model: {gemini_config.model}")

        if not gemini_config.api_key or len(gemini_config.api_key) == 0:
            raise ValueError("API key is required")
        if not gemini_config.model or not gemini_config.model.startswith("gemini-"):
            raise ValueError("Model is required and must start with 'gemini-'")

        try:
            self.client = genai.Client(api_key=gemini_config.api_key)
            self.model = gemini_config.model
        except Exception as e:
            logger.error(f"Error initializing Gemini client: {e}")
            raise e
    
    def generate_text(self, prompt: str, history: Optional[List[Dict]] = None) -> str:
        def single_contents_dict(role: str, text: str) -> Dict:
            return {
                "role": role,
                "parts": [
                    {"text": text}
                ]
            }
            
        if len(prompt) == 0:
            raise ValueError("Prompt cannot be empty")
        
        logger.info(f"Generating text with model: {self.model}")
        logger.info(f"Prompt: {prompt}")
        logger.info(f"History: {history}")

        contents = []
        if history:
            contents = history + [single_contents_dict("user", prompt)]
        else:
            contents = [single_contents_dict("user", prompt)]
        
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=contents
            )
        except Exception as e:
            logger.error(f"Error generating text for model {self.model}: {e}")
            raise e
        
        logger.debug(f"Response: {response}")
        
        if not response:
            raise ValueError("Empty response received from Gemini API")
        if hasattr(response, 'promptFeedback'):
            if hasattr(response.promptFeedback, 'blockReason'):
                raise ValueError(f"Prompt blocked: {response.promptFeedback.blockReason}")
        if not hasattr(response, 'text'):
            raise ValueError(f"Invalid response format: missing 'text' attribute. Response: {response}")

        history = contents + [single_contents_dict("model", response.text)]
        return response.text, history
        
    