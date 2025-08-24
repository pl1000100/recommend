from abc import ABC, abstractmethod
from typing import List, Dict, Optional


class AIClient(ABC):
    @abstractmethod
    def generate_text(self, prompt: str, history: Optional[List[Dict]] = None) -> str:
        pass