from imageai.Detection import ObjectDetection
import os
import sys
import base64
import numpy as np
from io import BytesIO
from PIL import Image


def read_in():
    lines = sys.stdin.readline()
    return lines

execution_path = os.getcwd()
detector = ObjectDetection()
detector.setModelTypeAsYOLOv3()
detector.setModelPath( os.path.join(execution_path , "models\\yolo.h5"))
detector.loadModel()
custom = detector.CustomObjects(car=True,bus=True,truck=True,bicycle=True,motorcycle=True,bottle=True)


# with open(os.path.join(execution_path,"city.jpg"), "rb") as image_file:
#     encoded_string = base64.b64encode(image_file.read())
while True:
    encoded_string = read_in()
    if(encoded_string == "quit"):
        break
    image = Image.open(BytesIO(base64.b64decode(encoded_string)))
    img = np.array(image)

    imagArray,detections = detector.detectObjectsFromImage(input_image=img,input_type="array",output_type="array")
    # imagArray,detections = detector.detectCustomObjectsFromImage(custom,input_image=img,input_type="array",output_type="array")
    sys.stdout.write(str(detections))
    sys.stdout.flush()
