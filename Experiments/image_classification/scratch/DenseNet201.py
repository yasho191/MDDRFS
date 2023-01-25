from tensorflow.keras.applications import DenseNet201
from tensorflow.keras.layers import Input, Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Model

def base_model() -> Model:
    # Define DenseNet201
    base = DenseNet201(include_top=False, weights=None, input_shape=(256, 256, 3))
    return base

def DenseNet(classes: int) -> Model:
    base_network = base_model()
    
    if classes > 1:
        act = 'softmax'
    else:
        act = 'sigmoid'

    # Input Layer
    input_layer = Input((256, 256, 3))
    x = base_network(input_layer)
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024)(x)
    x = Dropout(0.3)(x)
    x = Dense(512)(x)
    output_layer = Dense(classes, activation=act)(x)

    model = Model(inputs=input_layer, outputs=output_layer, name="DenseNet201")
    return model
