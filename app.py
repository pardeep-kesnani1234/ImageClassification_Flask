# Import neccessary libraries inorder to acheive your task
import json
from werkzeug.utils import secure_filename
from flask import Flask, redirect, url_for, request, render_template
import numpy as np
import time
import cv2
import os

num = 1
# Flask utils
# Define a flask app
app = Flask(__name__)


def init_classify():
    global net, classes
    classes = ["background", "aeroplane", "bicycle", "bird", "boat",
		"bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
		"dog", "horse", "motorbike", "person", "pottedplant", "sheep",
		"sofa", "train", "tvmonitor"]
    arch= 'Model/MobileNetSSD_deploy.prototxt.txt'
    weights ='Model/MobileNetSSD_deploy.caffemodel'	
    net = cv2.dnn.readNetFromCaffe(arch, weights)


init_classify()


@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':

        # Capturing from camera
        # cap = cv2.VideoCapture(0)
        # ret, frame = cap.read()
        # image = cv2.flip(frame, 1)
        # cv2.imwrite("uploads/image.png", image)
        # cap.release()

        # Get the file from post request
        f = request.files['file']
        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        print(file_path)

        image = cv2.imread(file_path)

        # Make prediction
        blob = cv2.dnn.blobFromImage(image, 0.007843,(300, 300), (127.5,127.5,127.5),True)
        net.setInput(blob)
        prediction = net.forward()
        idxs = int(prediction[0][0][0][1])
        label = classes[idxs]
        confidence = round(prediction[0][0][0][2] * 100, 2)
        comb = label + "," + str(confidence)
        return comb
	
        #return render_template('index.html',labeling=label,confidences=confidence);
    return None




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
