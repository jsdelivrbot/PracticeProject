import os


BASE_PATH = os.getcwd()
UPLOAD_FORDER = os.path.join(BASE_PATH, "upload")
FRONT_PATH = os.path.join(BASE_PATH, 'static', 'build')
STATIC_FORLDER = "./front/build/static"
TEMPLATE_FOLDER = "./front/build"
IP_ADDRESS = "0.0.0.0"
PORT = 2005

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_PATH, 'app.db')
SQLALCHEMY_MIGRATE_REPO = os.path.join(BASE_PATH, 'db_repository')

CELERY_BROKER_URL = 'redis://localhost:6379'
CELERY_RESULT_BACKEND = 'redis://localhost:6379'