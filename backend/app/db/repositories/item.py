from app.db.models import Item
import app.db.config as db_config

def create_item(item: Item):
    try:
        with db_config.get_db() as db:
            db.add(item)
            db.commit()
            db.refresh(item)
            return item
    except Exception as e:
        raise Exception(f"RepositoryError: Error creating item: {e}")

def get_item(item_id: int):
    try:
        with db_config.get_db() as db:
            return db.query(Item).filter(Item.id == item_id).first()
    except Exception as e:
        raise Exception(f"RepositoryError: Error getting item: {e}")

def get_items():
    try:
        with db_config.get_db() as db:
            return db.query(Item).all()
    except Exception as e:
        raise Exception(f"RepositoryError: Error getting items: {e}")