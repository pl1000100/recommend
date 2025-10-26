def db_init():
    import app.db.config as db
    db.create_tables()