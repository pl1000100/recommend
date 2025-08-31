from google import genai
from typing import List, Dict, Optional
import logging
from app.ai.clients.base import AIClient
from app.config import GeminiConfig
import asyncio


logger = logging.getLogger(__name__)


class GeminiClient(AIClient):
    def __init__(self, gemini_config: GeminiConfig):
        logger.info(f"Initializing Gemini client with model: {gemini_config.model}")

        if not gemini_config.api_key or len(gemini_config.api_key) == 0:
            raise ValueError("API key is required")
        if not gemini_config.model:
            raise ValueError("Model is required")

        # TO-DO: Add rate limiting

        try:
            self.client = genai.Client(api_key=gemini_config.api_key)
            self.model = gemini_config.model
            self.max_prompt_length = gemini_config.max_prompt_length
        except Exception as e:
            logger.error(f"Error initializing Gemini client: {e}")
            raise e

    async def generate_text(
        self, prompt: str, history: Optional[List[Dict]] = None
    ) -> tuple[str, list[dict]]:
        if not prompt or not prompt.strip():
            raise ValueError("Prompt cannot be empty or whitespace-only")
        if len(prompt) > self.max_prompt_length:
            raise ValueError(
                f"Prompt cannot be longer than {self.max_prompt_length} characters"
            )

        logger.info(f"Generating text with model: {self.model}")
        logger.debug(f"Prompt: {prompt}")
        logger.debug(f"History: {history}")

        contents = []
        if history:
            contents = history + [self._single_contents_dict("user", prompt)]
        else:
            contents = [self._single_contents_dict("user", prompt)]

        try:
            logger.debug(f"Calling Gemini API with contents: {contents}")
            response = await asyncio.get_running_loop().run_in_executor(
                None,  # TO-DO: Possibly wanna custom executor with otherthreadpool
                self._call_gemini_api,
                contents,
            )
        except Exception as e:
            logger.error(f"Error generating text for model {self.model}: {e}")
            raise e

        logger.debug(f"Response: {response}")

        if not response:
            raise ValueError("Empty response received from Gemini API")
        if hasattr(response, "promptFeedback"):
            if hasattr(response.promptFeedback, "blockReason"):
                raise ValueError(
                    f"Prompt blocked: {response.promptFeedback.blockReason}"
                )
        if not hasattr(response, "text"):
            raise ValueError(
                f"Invalid response format: missing 'text' attribute. Response: {response}"
            )

        history = contents + [self._single_contents_dict("model", response.text)]
        return response.text, history

    def _call_gemini_api(self, contents: List[Dict]):
        return self.client.models.generate_content(model=self.model, contents=contents)

    def _single_contents_dict(self, role: str, text: str) -> Dict:
        return {"role": role, "parts": [{"text": text}]}
