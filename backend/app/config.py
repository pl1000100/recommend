import os
from pydantic_settings import BaseSettings
from pydantic import Field

if os.getenv("ENVIRONMENT", "development") == "development":
    from dotenv import load_dotenv
    load_dotenv()

class LoggingConfig(BaseSettings):
    level: str = Field(default="INFO")
    
    model_config = {
        "env_prefix": "LOG_",
        "env_file": ".env",
        "extra": "ignore"
    }

class GeminiConfig(BaseSettings):
    api_key: str = Field(default="")
    model: str = Field(default="gemini-2.0-flash")
    
    model_config = {
        "env_prefix": "GEMINI_",
        "env_file": ".env",
        "extra": "ignore"   
    }
    
class AppConfig(BaseSettings):
    environment: str = Field(default="development", env="ENVIRONMENT")
    host: str = Field(default="0.0.0.0", env="HOST")
    port: int = Field(default=8000, env="PORT")

    logging: LoggingConfig = LoggingConfig()
    gemini: GeminiConfig = GeminiConfig()

app_config = AppConfig()