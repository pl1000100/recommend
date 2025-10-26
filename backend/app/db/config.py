# app/db/config.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import app_config
from app.db.models.item import Base
import logging
from contextlib import contextmanager

logger = logging.getLogger(__name__)

# TO_DO db for prod
engine = create_engine(
    app_config.database.database_url,
    echo=True if app_config.environment == "development" else False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_tables():
    Base.metadata.create_all(bind=engine)
    logger.debug(f"DB tables created")

@contextmanager
def get_db():
    logger.debug(f"Getting DB session")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()