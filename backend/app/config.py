import os
from pydantic import BaseSettings, Field

if os.getenv("ENVIRONMENT", "development") == "development":
    from dotenv import load_dotenv
    load_dotenv()

class LoggingConfig(BaseSettings):
    level: str = Field(default="INFO", env="LOG_LEVEL")
    
class AppConfig(BaseSettings):
    environment: str = Field(default="development", env="ENVIRONMENT")
    host: str = Field(default="0.0.0.0", env="HOST")
    port: int = Field(default=8000, env="PORT")

    logging: LoggingConfig = LoggingConfig()


app_config = AppConfig()