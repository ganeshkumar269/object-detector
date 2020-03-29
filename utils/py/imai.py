from imageai.Detection import ObjectDetection
import os
import io
import sys
execution_path = os.getcwd()

inp_name = "input.jpg"
out_name = "output.jpg"

detector = ObjectDetection()
detector.setModelTypeAsYOLOv3()
detector.setModelPath( os.path.join(execution_path , "models\\yolo.h5"))
detector.loadModel()
detections = detector.detectObjectsFromImage(input_image=os.path.join(os.path.join(execution_path ,"public"), inp_name), output_image_path=os.path.join(os.path.join(execution_path,"public") , out_name))
sys.stdout.write(str(detections.__len__()))
sys.stdout.flush()