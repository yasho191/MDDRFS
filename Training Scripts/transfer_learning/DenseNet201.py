import tensorflow as tf
from tensorflow.keras.applications import DesnseNet201
from tensorflow.keras.layers import Input, Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Model

def base_model():
    # Define DenseNet201
    base = DesnseNet201(include_top=False, weights='imagenet', input_shape=(256, 256, 3))

    # Freeze Layers
    for layer in base.layers:
        layer.trainable = False
    
    return base

def DenseNet(classes):
    base_network = base_model()
    
    if classes > 1:
        act = 'softmax'
    else:
        act = 'sigmoid'

    # Input Layer
    input_layer = Input((256, 256, 3))
    x = base_network(input_layer)
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation='relu')(x)
    x = Dense(512, activation='relu')(x)
    x = Dropout(0.3)(x)
    output_layer = Dense(classes, activation=act)(x)

    model = Model(inputs=input_layer, outputs=output_layer, name="DenseNet201")
    return model
