from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from .api.v1.router import router as router_v1
import logging
from app.config import app_config
from fastapi import Request
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded
from app.core import limiter

logging.basicConfig(level=app_config.logging.level)
logger = logging.getLogger(__name__)


def _rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(status_code=429, content={"detail": "Rate limit exceeded"})


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=app_config.cors.allow_origins,
    allow_credentials=app_config.cors.allow_credentials,
    allow_methods=app_config.cors.allow_methods,
    allow_headers=app_config.cors.allow_headers,
)

logger.info("Starting server")

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


app.include_router(router_v1, prefix="/api/v1", tags=["v1"])


# TO-DO: Add response handlers for response codes 500 400 etc. to be visable in docs
@app.get("/health")
@limiter.limit(app_config.rate_limit.slowapi_default)
async def health(request: Request):
    logger.info("Health endpoint called")
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
