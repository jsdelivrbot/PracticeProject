# python3
import os, time
from flask import Flask, request, jsonify, send_from_directory
from config import IP_ADDRESS, PORT, BASE_PATH, FRONT_PATH, UPLOAD_FORDER
from werkzeug import secure_filename

app = Flask(
    __name__, 
    static_folder="./front/build/static",
    template_folder="./front/build"
    # static_folder="./front/src",
    # template_folder="./front/public"
)

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
            secure_filename(file_data.filename)
            file_data.save(os.path.join(UPLOAD_FORDER, file_name))
            time.sleep(0)
            return jsonify({"result":"FILE_RECEIVED"})

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

@app.route('/main', methods=['GET'])
def main():
    if request.method == 'GET':
        index_path = 'index.html'
        return send_from_directory('front/build', 'index.html')

if __name__ == "__main__":
    app.run(host=IP_ADDRESS, port=PORT, debug=True, use_reloader=True, threaded=True)