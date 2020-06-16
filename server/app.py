from flask import Flask
from flask import jsonify
app = Flask(__name__)

@app.route('/', methods=['GET'])
def status():
    return jsonify({"status":"OK"}),200

if __name__ == '__main__':
    app.run(threaded=True, port=5000)