import os
from pydantic_settings import BaseSettings
from pydantic import Field

if os.getenv("ENVIRONMENT", "development") == "development":
    from dotenv import load_dotenv

    load_dotenv()


class LoggingConfig(BaseSettings):
    # TO-DO: add logging to file
    # TO-DO: add more standardized structure for logging
    level: str = Field(default="INFO")

    model_config = {"env_prefix": "LOG_", "env_file": ".env", "extra": "ignore"}


class GeminiConfig(BaseSettings):
    api_key: str = Field(default="")
    model: str = Field(default="gemini-2.0-flash")
    max_prompt_length: int = Field(default=10000)
    max_history_length: int = Field(default=20)

    model_config = {"env_prefix": "GEMINI_", "env_file": ".env", "extra": "ignore"}


class RateLimitConfig(BaseSettings):
    slowapi_default: str = Field(default="5/minute")
    slowapi_ai: str = Field(default="1/minute")

    model_config = {"env_prefix": "RATE_LIMIT_", "env_file": ".env", "extra": "ignore"}


class AppConfig(BaseSettings):
    environment: str = Field(default="development", env="ENVIRONMENT")
    host: str = Field(default="0.0.0.0", env="HOST")
    port: int = Field(default=8000, env="PORT")

    logging: LoggingConfig = LoggingConfig()
    gemini: GeminiConfig = GeminiConfig()
    rate_limit: RateLimitConfig = RateLimitConfig()


app_config = AppConfig()
