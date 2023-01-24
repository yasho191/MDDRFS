import cv2
import PIL.Image as Image
import numpy as np

# Basic Preprocessing 
# Centre crop to be added 
def process_image(path):
    img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (512, 512))
    img = np.asarray(img, dtype="float32")
    img = img/255.0
    img = np.reshape(img, (512, 512, 1))
    
    return img

# Data Augmentation