from enum import Enum

class AIProvider(str, Enum):
    GEMINI = "gemini"

    @classmethod
    def get_all_providers(cls) -> list[str]:
        return [provider.value for provider in cls]
        