from fastapi import FastAPI
import uvicorn
from .api.v1.router import router as router_v1
import logging
from app.config import app_config


logger = logging.getLogger(__name__)
logger.setLevel(app_config.logging.level)

app = FastAPI()

logger.info("Starting server")

app.include_router(router_v1, prefix="/api/v1", tags=["v1"])

@app.get("/health")
async def health():
    logger.info("Health endpoint called")
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)