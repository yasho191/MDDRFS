from unet import UNet
import os
import numpy as np
from .preprocessing import process_image
from functional import *

def MeanIOU(predictions, labels, threshold):
    samples = len(predictions)
    iou = 0
    for i in range(samples):
        iou += iou_score(labels[i], predictions[i], threshold=threshold)

    return iou/samples

def MeanDiceCoeff(predictions, labels, threshold):
    samples = len(predictions)
    dice_coef = 0
    for i in range(samples):
        dice_coef += dice_coefficient(labels[i], predictions[i], threshold=threshold)

    return dice_coef/samples 


if __name__ == "__main__":
    model = UNet((512, 512, 1), 64, 'transpose2d')
    model.load_weights('ckpt_path')

    path = 'Data/Segmentation'
    test_img = sorted(os.listdir(path + '/Test/Input'))
    test_cleaned_img = sorted(os.listdir(path + '/Test/Output'))

    test = []
    test_cleaned = []

    path3 = 'Data/Segmentation/Test'

    # Testing
    for f in sorted(os.listdir(path3 + '/Input')):
        test.append(process_image(path3 + '/Input/' + f))

    for f in sorted(os.listdir(path3 + '/Output')):
        test_cleaned.append(process_image(path3 + '/Output/' + f))

    X_test = np.asarray(test)
    Y_test = np.asarray(test_cleaned)

    del test
    del test_cleaned

    predictions = model.predict(X_test)

    iou_50 = MeanIOU(list(predictions), list(Y_test), threshold = 0.5)
    dice_50 = MeanDiceCoeff(list(predictions), list(Y_test), threshold = 0.5)

    iou_75 = MeanIOU(list(predictions), list(Y_test), threshold = 0.75)
    dice_75 = MeanDiceCoeff(list(predictions), list(Y_test), threshold = 0.75)

    iou_90 = MeanIOU(list(predictions), list(Y_test), threshold = 0.9)
    dice_90 = MeanDiceCoeff(list(predictions), list(Y_test), threshold = 0.9)
