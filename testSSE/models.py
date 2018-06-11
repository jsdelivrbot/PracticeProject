from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class FileList(db.Model):
    __tablename__ = 'file_list'
    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String(300))
    is_completed = db.Column(db.Integer)
    created_at = db.Column(db.DateTime)

    def __init__(self, file_name):
        self.file_name = file_name
        self.is_completed = 0
        self.created_at = datetime.now()
