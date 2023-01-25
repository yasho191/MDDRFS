from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Input, Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Model

def base_model() -> Model:
    # MobileNetV2
    base = MobileNetV2(include_top=False, weights=None, input_shape=(256, 256, 3))
    return base

def MobileNet(classes: int) -> Model:
    base_network = base_model()

    if classes > 1:
        act = 'softmax'
    else:
        act = 'sigmoid'

    # Model Architecture
    input_layer = Input((256, 256, 3))

    x = base_network(input_layer)
    x = GlobalAveragePooling2D()(x)
    x = Dense(1024, activation=act)(x)
    x = Dropout(0.3)(x)
    x = Dense(512)(x)

    output_layer = Dense(classes, activation=act)(x)

    model = Model(input_layer=input_layer, output_layer=output_layer, name="MobileNetV2")

    return model
