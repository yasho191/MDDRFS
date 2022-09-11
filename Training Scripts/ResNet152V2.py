import tensorflow as tf
from tensorflow.keras.applications import ResNet152V2
from tensorflow.keras.layers import Input, Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Model

def base_model():
    # Define ResNet152V2
    base = ResNet152V2(include_top=False, weights='imagenet', input_shape=(256, 256, 3))
    
    # Freeze Layers
    for layer in base.layers:
        layer.trainable = False

    return base

def ResNet(classes, last_layer_act):
    base_network = base_model()

    # Input Layer
    input_layer = Input((256, 256, 3))
    x = base_network(input_layer)
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation='relu')(x)
    x = Dense(512, activation='relu')(x)
    x = Dropout(0.3)(x)
    output_layer = Dense(classes, activation=last_layer_act)(x)

    model = Model(inputs=input_layer, outputs=output_layer, name="ResNet152V2")
    return model