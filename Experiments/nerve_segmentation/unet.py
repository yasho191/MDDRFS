import numpy as np
from tensorflow.keras.models import Model
from tensorflow.keras.layers import BatchNormalization, Conv2D, Conv2DTranspose
from tensorflow.keras.layers import MaxPooling2D, Dropout, Input, concatenate, UpSampling2D

# UNet: Symmetric No Crops
# Simple and Transpose Upsampling
# DropOut
# Concat

# ConvBlock
def conv2d_block(x: np.array, neurons: int, multiplier: int, dropout: float) -> tuple:
    x = Conv2D(neurons * multiplier, (3, 3), activation="relu", padding="same")(x)
    x = Conv2D(neurons * multiplier, (3, 3), activation="relu", padding="same")(x)
    x_pool = MaxPooling2D((2, 2))(x)
    x_pool = Dropout(dropout)(x_pool)

    return (x, x_pool)

# Simple upsampling
def upsample2d(x: np.array, x_concat: np.array, neurons: int, multiplier: int, dropout: float) -> np.array:
    x = UpSampling2D(neurons * multiplier, (3, 3), strides=(2, 2), padding="same")(x)
    x = concatenate([x, x_concat])
    x = Dropout(dropout)(x)
    x = Conv2D(neurons * multiplier, (3, 3), activation="relu", padding="same")(x)
    x = Conv2D(neurons * multiplier, (3, 3), activation="relu", padding="same")(x)

    return x

# Conv2DTranspose Upsample
def upsample_conv2dtranspose(x: np.array, x_concat: np.array, neurons: int, multiplier: int, dropout: float) -> np.array:
    x = Conv2DTranspose(neurons * multiplier, (3, 3), strides=(2, 2), padding="same")(x)
    x = concatenate([x, x_concat])
    x = Dropout(dropout)(x)
    x = Conv2D(neurons * multiplier, (3, 3), activation="relu", padding="same")(x)
    x = Conv2D(neurons * multiplier, (3, 3), activation="relu", padding="same")(x)

    return x

# Main Model
def UNet(input_size: int, start_neurons: int, upsample: str) -> Model:
    input_layer = Input((input_size, input_size, 1))

    # Encoder Net
    x_res1, x = conv2d_block(input_layer, start_neurons, 1, 0.25)
    x_res2, x = conv2d_block(x, start_neurons, 2, 0.5)
    x_res3, x = conv2d_block(x, start_neurons, 4, 0.5)
    x_res4, x = conv2d_block(x, start_neurons, 8, 0.5)

    # latent space
    x = Conv2D(start_neurons * 16, (3, 3), activation="relu", padding="same")(x)
    x = Conv2D(start_neurons * 16, (3, 3), activation="relu", padding="same")(x)

    # Decoder Net
    if upsample == 'transpose2d':
        x = upsample_conv2dtranspose(x, x_res4, start_neurons, 8, 0.5)
        x = upsample_conv2dtranspose(x, x_res3, start_neurons, 4, 0.5)
        x = upsample_conv2dtranspose(x, x_res2, start_neurons, 2, 0.5)
        x = upsample_conv2dtranspose(x, x_res1, start_neurons, 1, 0.5)
    
    elif upsample == 'upsample2d':
        x = upsample2d(x, x_res4, start_neurons, 8, 0.5)
        x = upsample2d(x, x_res3, start_neurons, 4, 0.5)
        x = upsample2d(x, x_res2, start_neurons, 2, 0.5)
        x = upsample2d(x, x_res1, start_neurons, 1, 0.5)
    
    else:
        return ('Invalid upsample!')

    output_layer = Conv2D(1, (1,1), padding="same", activation="sigmoid")(x)

    model = Model(inputs=input_layer, outputs=output_layer, name="Unet")
    return model