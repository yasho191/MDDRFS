from transfer_learning.DenseNet201 import DenseNet
from transfer_learning.EfficientNetB7 import EfficientNetV1
from transfer_learning.EfficientNetV2 import EfficientNetV2
from transfer_learning.MobileNetV2 import MobileNet
from transfer_learning.ResNet152V2 import ResNet
from transfer_learning.Xception import XceptionNet

def model_generator(name, classes):
    if name.lower() == 'densenet':
        return DenseNet(classes)
    elif name.lower == 'resnet':
        return ResNet(classes)
    elif name.lower() == 'xceptionnet':
        return XceptionNet(classes)
    elif name.lower() == 'mobilenet':
        return MobileNet(classes)
    elif name.lower().startswith('efficientnetv2'):
        return EfficientNetV2(name[-1].upper(), classes)
    elif name.lower() == 'efficientnetv1':
        return EfficientNetV1(classes)
    else:
        raise TypeError(f"No model named: {name}\nModel name should be one of [densenet, mobilenet, resnet, xceptionnet, efficientnetv1, efficientnetv2s, efficientnetv2m, efficientnetv2l]")
        