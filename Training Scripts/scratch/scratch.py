import tensorflow as tf
from tensorflow.keras.applications import DenseNet201, ResNet152V2
from tensorflow.keras.layers import Input, Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Model, Sequential

class GenerateModel:
    def __init__(self, name, shape, classes):
        self.name = name 
        self.shape = shape 
        self.classes = classes
    
    def lower_dense_net(self):
        if self.classes > 1:
            act = 'softmax'
        else:
            act = 'sigmoid'

        lower_model = Sequential([
            GlobalAveragePooling2D(),
            Dense(1024, activation='relu'),
            Dropout(0.3),
            Dense(512, activation='relu'),
            Dense(self.classes, activation=act)
        ])
        
        return lower_model
            
    def make_model(self):
        if self.name.lower() == 'densenet201':
            base_model = ResNet152V2(include_top=False, 
                                weights=None, 
                                input_shape=self.shape, 
                                )

        lower_model = self.lower_dense_net()

        input_layer = Input(self.shape)
        x = base_model(input_layer)
        output_layer = lower_model(x)
        model = Model(inputs=input_layer, outputs=output_layer, name=self.name)

        return model


model_gen = GenerateModel('densenet201', (300, 300, 3), 25)
model = model_gen.make_model()
print(model.summary())