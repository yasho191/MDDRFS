import tensorflow as tf
from tensorflow.python.keras.backend import get_session

# Clear any previous session.
tf.keras.backend.clear_session()
# This line must be executed before loading Keras model.
tf.keras.backend.set_learning_phase(0) 

# To convert .h5 to Keras Model
save_model_dir = '/Users/yashowardhanshinde/Desktop/deep_eye_backend/tf_models/binary_classification/efficientnetv2m_model_opt'
model = tf.keras.models.load_model('/Users/yashowardhanshinde/Desktop/deep_eye_backend/tf_models/binary_classification/efficientnetv2m_model')
model.save(save_model_dir)

# convert Keras model to .h5
# model = load_model(save_model_dir)
# model.save('EraseNet.h5')