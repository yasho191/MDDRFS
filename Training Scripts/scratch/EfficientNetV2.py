from tensorflow.keras.applications import EfficientNetV2L, EfficientNetV2M, EfficientNetV2S
from tensorflow.keras.layers import Input, Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Model

def base_model(model_type: str) -> Model:

    # Define EfficientV2
    if model_type.upper() == 'S':
        base = EfficientNetV2S(include_top=False, weights=None, input_shape=(256, 256, 3))
    elif model_type.upper() == 'M':
        base = EfficientNetV2M(include_top=False, weights=None, input_shape=(256, 256, 3))
    elif model_type.upper() == 'L':
        base = EfficientNetV2L(include_top=False, weights=None, input_shape=(256, 256, 3))
    else:
        raise TypeError(f"Invalid Input: {model_type}\nThere is no model type called {model_type}. Model Should be one of [S, M, L]")

    return base

# For binary classification (classes = 1)
def EfficientNetV2(model_type: str, classes: int) -> Model:

    base_network = base_model(model_type)

    if classes > 1:
        act = 'softmax'
    else:
        act = 'sigmoid'

    # Input Layer
    input_layer = Input((256, 256, 3))

    x = base_network(input_layer)
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation='relu')(x)
    x = Dropout(0.3)(x)
    x = Dense(512, activation='relu')(x)

    output_layer = Dense(classes, activation=act)(x)

    model = Model(inputs=input_layer, outputs=output_layer, name=f"EfficientNet{model_type}V2")
    
    return model
    