# python3
import os, time, json
from flask import Flask, request, jsonify, send_from_directory
from config import IP_ADDRESS, PORT, BASE_PATH, FRONT_PATH, UPLOAD_FORDER, STATIC_FORLDER, TEMPLATE_FOLDER, \
                   CELERY_BROKER_URL, CELERY_RESULT_BACKEND, SQLALCHEMY_DATABASE_URI
from werkzeug import secure_filename
# from celery_module import init_celery
from models import db, FileList
from celery_module import CeleryModule

app = Flask(__name__, static_folder=STATIC_FORLDER, template_folder=TEMPLATE_FOLDER)
app.config.update(
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
    SQLALCHEMY_DATABASE_URI=SQLALCHEMY_DATABASE_URI,
    CELERY_BROKER_URL=CELERY_BROKER_URL,
    CELERY_RESULT_BACKEND=CELERY_RESULT_BACKEND
)

db.init_app(app)
celery = CeleryModule(app)


def has_file(target):
    return len(target.files) > 0


def get_request_data(req_data, *args):
    result = []
    for key in args:
        result.append(req_data[key])
    if len(result) is 1:
        return result[0]
    else:
        return result


@celery.task()
def save_file(target):
    file_name = target['file_name']
    file_data = target['file_data'].encode('iso-8859-1')
    save_path = os.path.join(UPLOAD_FORDER, file_name)
    with open(save_path, 'wb') as f:
        f.write(file_data)
    insert_filename_to_DB(file_name)
    return json.dumps({'fileName' : file_name, 'fileResult' : "Success"})


def insert_filename_to_DB(file_name):
    with app.app_context():
        new_file = FileList(file_name)
        db.session.add(new_file)
        db.session.commit()

@app.route('/test1', methods=['GET', 'POST'])
def test1():
    if request.method == 'GET':
        return jsonify({"request":"GET SUCCESS"})
    elif request.method == 'POST':
        if has_file(request) is False:
            return jsonify({"result":"NO_FILE"})
        else:
            file_name = get_request_data(request.form, 'fileName')
            file_data = get_request_data(request.files, 'fileData')
            file_data_bytes = file_data.read().decode('iso-8859-1')
            target = {"file_name":file_name, "file_data":file_data_bytes}
            save_file.apply_async(args=[target], countdown=0)
            return jsonify({"result":"FILE_RECEIVED"})


@app.route('/main', methods=['GET'])
def main():
    if request.method == 'GET':
        index_path = 'index.html'
        return send_from_directory('front/build', index_path)


if __name__ == "__main__":
    celery.process_start()
    app.run(host=IP_ADDRESS, port=PORT, debug=False)
