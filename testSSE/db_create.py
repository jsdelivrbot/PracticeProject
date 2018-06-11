from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO
from app import app, db
import os

with app.app_context():
    db.create_all()
