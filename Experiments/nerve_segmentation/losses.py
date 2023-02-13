from tensorflow.keras.losses import Loss
from functional import iou_score, dice_coefficient, tversky
import tensorflow.keras.backend as K

################################################################################
# Losses
################################################################################
class JaccardLoss(Loss):
    def __init__(self, class_weights=None, smooth=1e-5):
        super().__init__(name="jaccard_loss")
        self.class_weights = class_weights if class_weights is not None else 1.0
        self.smooth = smooth

    def __call__(self, y_true, y_pred):
        return 1.0 - iou_score(
            y_true,
            y_pred,
            class_weights=self.class_weights,
            smooth=self.smooth,
            threshold=None
        )

class DiceLoss(Loss):
    def __init__(self, beta=1.0, class_weights=None, smooth=1e-5):
        super().__init__(name="dice_loss")
        self.beta = beta
        self.class_weights = class_weights if class_weights is not None else 1.0
        self.smooth = smooth

    def __call__(self, y_true, y_pred):
        # print(y_pred)
        return 1.0 - dice_coefficient(
            y_true,
            y_pred,
            beta=self.beta,
            class_weights=self.class_weights,
            smooth=self.smooth,
            threshold=None
        )


class TverskyLoss(Loss):
    def __init__(self, alpha=0.7, class_weights=None, smooth=1e-5):
        super().__init__(name="tversky_loss")
        self.alpha = alpha
        self.class_weights = class_weights if class_weights is not None else 1.0
        self.smooth = smooth

    def __call__(self, y_true, y_pred):
        return 1.0 - tversky(
            y_true,
            y_pred,
            alpha=self.alpha,
            class_weights=self.class_weights,
            smooth=self.smooth,
            threshold=None
        )


class FocalTverskyLoss(Loss):
    def __init__(self, alpha=0.7, gamma=1.25, class_weights=None, smooth=1e-5):
        super().__init__(name="focal_tversky_loss")
        self.alpha = alpha
        self.gamma = gamma
        self.class_weights = class_weights if class_weights is not None else 1.0
        self.smooth = smooth

    def __call__(self, y_true, y_pred):
        return K.pow((1.0 - tversky(
            y_true,
            y_pred,
            alpha=self.alpha,
            class_weights=self.class_weights,
            smooth=self.smooth,
            threshold=None
        )),
        self.gamma
        )