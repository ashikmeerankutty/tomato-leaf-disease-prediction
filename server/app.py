import json
import urllib.request
import base64
from flask_cors import CORS

# Flask utils
from flask import Flask, redirect, url_for, render_template, request, jsonify
from PIL import Image as PILImage

# Import fast.ai Library
from fastai import *
from fastai.vision import *

# Define a flask app
app = Flask(__name__)

PATH_TO_MODELS_DIR = Path('./models')

learn = load_learner(PATH_TO_MODELS_DIR, 'learn.pkl')

cors = CORS(app, resources={r"/predict": {"origins": "*"}})

def encode(img):
    img = (image2np(img.data) * 255).astype('uint8')
    pil_img = PILImage.fromarray(img)
    buff = BytesIO()
    pil_img.save(buff, format="JPEG")
    return base64.b64encode(buff.getvalue()).decode("utf-8")

def model_predict(img):
    img = open_image(BytesIO(img))
    pred_class,pred_idx,outputs = learn.predict(img)
    formatted_outputs = ["{:.1f}%".format(value) for value in [x * 100 for x in torch.nn.functional.softmax(outputs, dim=0)]]
    pred_probs = sorted(
            zip(learn.data.classes, map(str, formatted_outputs)),
            key=lambda p: p[1],
            reverse=True
        )
	
    img_data = encode(img)
    result = {"class":str(pred_class), "probs":pred_probs}
    return result,200

@app.route('/', methods=['GET'])
def status():
    return jsonify({"status":"OK"}),200

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Get the file from post request
        img = request.files['file'].read()
        if img != None:
        # Make prediction
            preds = model_predict(img)
            return preds
    return jsonify({"status":"FAILED"}),200


if __name__ == '__main__':
    app.run(threaded=True, port=5000)