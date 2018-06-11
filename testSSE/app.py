# python3
import os, time, subprocess, json, multiprocessing
from flask import Flask, request, jsonify, send_from_directory
from config import IP_ADDRESS, PORT, BASE_PATH, FRONT_PATH, UPLOAD_FORDER, STATIC_FORLDER, TEMPLATE_FOLDER
from werkzeug import secure_filename
from celery import Celery

app = Flask(__name__, static_folder=STATIC_FORLDER, template_folder=TEMPLATE_FOLDER)
# app.config['CELERY_BROKER_URL'] = 'redis://localhost:6397'
# app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6397'
app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',
    CELERY_RESULT_BACKEND='redis://localhost:6379'
)

def make_celery(app):

    print(app.import_name)
    celery = Celery('app', backend=app.config['CELERY_RESULT_BACKEND'],
                    broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    task_base = celery.Task

    class ContextTask(task_base):
        abstract = True
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return task_base.__call__(self, *args, **kwargs)
    celery.Task = ContextTask
    return celery

def start_celery_command():
    command_text = "celery worker -A app.celery --loglevel=info"
    subprocess.call(command_text, shell=True)

def make_celery_processing():
    celery_process = multiprocessing.Process(target=start_celery_command)
    return celery_process

celery = make_celery(app)

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
    print("{} : 끝!!".format(file_name))
    return json.dumps({'fileName' : file_name, 'fileResult' : "Success"})

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
            print("{} 시작".format(file_name))
            result = save_file.apply_async(args=[target], countdown=0)
            print("{} 비동기 호출됨".format(file_name))
            # result = save_file.delay(target)
            # result.wait()

            # db add 해야 한다.
            return jsonify({"result":"FILE_RECEIVED"})


@app.route('/main', methods=['GET'])
def main():
    if request.method == 'GET':
        index_path = 'index.html'
        return send_from_directory('front/build', 'index.html')


if __name__ == "__main__":
    celery_process = make_celery_processing()
    celery_process.start()
    app.run(host=IP_ADDRESS, port=PORT, debug=False)
