import tensorflow as tf
import numpy as np
from PIL import Image

risk_model = tf.keras.models.load_model('tf_models/binary_classification/efficientnetv2m_model_opt')     
disease_model = tf.keras.models.load_model('tf_models/binary_classification/efficientnetv2m_model_opt')

def read_image(file):
    image = Image.open(file)
    image = image.convert('RGB')
    l,h = image.size
    dif = abs(l-h)//2
    image = image.crop([dif,0,l-dif,h])
    return np.array(image)

    
def predict_risk(image: np.ndarray):
    # convert image
    image = np.resize(image, (360, 360, 3))
    image = np.expand_dims(image, 0)
    # load model
    pred = risk_model.predict(image)
    if pred > 0.5:
        return 'Disease Risk'
    else:
        return 'No Disease Risk'

image = read_image('1809.png')
print(image.size)
result = predict_risk(image)
print(result)

