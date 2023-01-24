import tensorflow as tf
from unet import UNet
import os
import numpy as np
from tensorflow.keras.callbacks import ReduceLROnPlateau
from tensorflow.keras.optimizers import Adam
from .preprocessing import process_image
from losses import JaccardLoss, DiceLoss
from metrics import IOUScore, FScore

# Jaccard loss, MSE
# Adam Optimizer
# Learning rate schedule
# Checkpoint
# Fixed Size = 512x512

MODEL_NAME = "Segmentation UNET"
# path to zipped & working directories
path = 'Data/Segmentation'

# store image names in list for later use
train_img = sorted(os.listdir(path + '/Train/Input'))
train_cleaned_img = sorted(os.listdir(path + '/Train/Output'))
validation_img = sorted(os.listdir(path + '/Validate/Input'))
validation_cleaned_img = sorted(os.listdir(path + '/Validate/Output'))


# Print Number of Images found
print(f'Training Images: {len(train_img)}')
print(f'Training Image Labels: {len(train_cleaned_img)}')
print(f'Validation Images: {len(validation_img)}')
print(f'Validation Image Labels: {len(validation_cleaned_img)}')
images = [i for i in train_img if i not in train_cleaned_img]
print(images)

train = []
train_cleaned = []
validate = []
validate_cleaned = []


path1 = 'Data/Segmentation/Train'
path2 = 'Data/Segmentation/Validate'


# Training
for f in sorted(os.listdir(path1 + '/Input')):
    train.append(process_image(path1 + '/Input/' + f))

for f in sorted(os.listdir(path1 + '/Output')):
    train_cleaned.append(process_image(path1+ '/Output/' + f))
    
# Validation 
for f in sorted(os.listdir(path2 + '/Input')):
    validate.append(process_image(path2 + '/Input/' + f))
    
for f in sorted(os.listdir(path2 + '/Output')):
    validate_cleaned.append(process_image(path2 + '/Output/' + f))
    


# convert list to numpy array
X_train = np.asarray(train)
Y_train = np.asarray(train_cleaned)
X_val = np.asarray(validate)
Y_val = np.asarray(validate_cleaned)


del train
del train_cleaned
del validate
del validate_cleaned

model = UNet((512, 512, 1), 64, 'transpose2d')
checkpoint = tf.keras.callbacks.ModelCheckpoint(f"ckpt/{MODEL_NAME}/best_model", save_best_only=True)
reduce_lr = ReduceLROnPlateau(monitor='val_loss', 
                              factor=0.1,
                              patience=5, 
                              min_lr=10e-12, 
                              verbose=1)
model.compile(optimizer=Adam(learning_rate = 10e-4), 
              loss=JaccardLoss(), 
              metrics=[IOUScore(threshold=0.5), FScore(threshold=0.5)],
              callbacks=[checkpoint])
history = model.fit(X_train, Y_train, 
                    validation_data=(X_val, Y_val), 
                    epochs=50, 
                    batch_size=2, 
                    callbacks=[reduce_lr])