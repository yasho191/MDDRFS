import tensorflow as tf
from transfer_models import model_generator
import argparse
import os
import tensorflow_addons as tfa

'''
Argguments for training script:
-m --model: The name of the model to be trained.
-s --shape: The input shape of the images used for training.
-e --epochs: The number of epochs for which the model should be trained.
-b --batch_size: The batch_size for mini-batch training.
-o --optimizer: The type of optimizer to be used.
-c --classes: The number of categories you want to train the model on.

Notes:
Optimizers:
Model Optimizers used for training will be SGD and Adam Optimizer.
The optimizers can be optimized using strategies like One-Cycle Learning Rate.
Callbacks for scheduling learning rate can be ReduceLROnPlataue, CosineDecay, ExpotentialDecay.
Custom callbacks can be used using the LearningRateSchedule.
Types for optimizer:
1. adam
2. adam-cyclic
2. sgd
4. sgd-momentum
5. sgd-nesterov

Features Added:
- Tensorboard Intergation added
- Checkpointing Added

Pending:
- Augmentations
'''
parser = argparse.ArgumentParser()
parser.add_argument("-m", "--model", 
                    help="Name of the model. Must be one of: \
                    1. densenet        \
                    2. resnet          \
                    3. xceptionnet     \
                    4. mobilenet       \
                    5. efficientnetv2s \
                    6. efficientnetv2m \
                    7. efficientnetv2l \
                    8. efficientnetv1", type=str, default='resnet')
parser.add_argument("-s", "--shape", help="Input Shape", type=int, default=300)
parser.add_argument("-e", "--epochs", type=int, default=100)
parser.add_argument("-b", "--batch_size", type=int, default=16)
parser.add_argument("-o", "--optimizer", type=str, default='adam')
parser.add_argument("-c", "--classes", type=int, default=25)

args = parser.parse_args()

MODEL_NAME = args.model
SHAPE = (args.shape, args.shape, 3)
EPOCHS = args.epochs
BATCH_SIZE = args.batch_size
CLASS_MODE = 'sparse'
OPTIM_TYPE = args.optimizer
CLASSES = args.classes

if MODEL_NAME not in ['densenet', 
                    'resnet', 
                    'xceptionnet', 
                    'mobilenet', 
                    'efficientnetv2s', 
                    'efficientnetv2m', 
                    'efficientnetv2l', 
                    'efficientnetv1']:
    raise TypeError(f'Eror: No model with name {MODEL_NAME}')

# Checkpointing
if os.path.exists(f'ckpt/{MODEL_NAME}/best_model'):
    model = tf.keras.models.load_model(f"ckpt/{MODEL_NAME}/best_model")
    print('Restoring model from previous checkpoint...')
else:
    print('No checkpoints found.\nInitializing new model...')
    os.mkdir(f'ckpt/{MODEL_NAME}')
    model = model_generator(MODEL_NAME, CLASSES)

# Initialize Variables
TRAIN_IMG_DIR = os.path.join('data/train')
VALID_IMG_DIR = os.path.join('data/validate')

# Initialize Data Generators
# Different Augmentations can also be applied on data
# Image Augmentation to be integrated
# Basic Preprocessing included as of now
train_data_generator = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1/255.)
validation_data_generator = tf.keras.preprocessing.image.ImageDataGenerator(rescale=1/255.)

# Get Training, Testing and Validation Data
train_data = train_data_generator.flow_from_directory(
                        TRAIN_IMG_DIR,
                        target_size=SHAPE[:2],
                        batch_size=BATCH_SIZE,
                        class_mode=CLASS_MODE)

valid_data = validation_data_generator.flow_from_directory(
                        VALID_IMG_DIR,
                        target_size=SHAPE[:2],
                        batch_size=BATCH_SIZE//2,
                        class_mode=CLASS_MODE)

print("Training Data Indices: ", train_data.class_indices)
print("Validation Data Indices: ", valid_data.class_indices)

# CALLBACKS
# learning rate scheduler can also be applied based on requirements
# One Cycle Rate to added usinf Tensorflow Addons
# basic tensorboard callback for monitoring training loss
steps_per_epoch = len(train_data)//BATCH_SIZE
one_cycle_lr_schedule = tfa.optimizers.CyclicalLearningRate(initial_learning_rate=0.0001, maximal_learning_rate=0.01, scale_fn=lambda x: 1/(2.**(x-1)), step_size=2 * steps_per_epoch)
checkpoint = tf.keras.callbacks.ModelCheckpoint(f"ckpt/{MODEL_NAME}/best_model", save_best_only=True)
tensorboard = tf.keras.callbacks.TensorBoard(log_dir='logs')
callback_collection = [checkpoint, tensorboard]

# COMPILATION
# Compile models with Adam Optimizer and Sparse categorical crossentropy
loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False, name='sparse_categorical_crossentropy')
if OPTIM_TYPE == 'adam':
    optim = tf.keras.optimizers.Adam(learning_rate=10e-4)
elif OPTIM_TYPE == 'adam-cyclic':
    optim = tf.keras.optimizers.Adam(one_cycle_lr_schedule)
elif OPTIM_TYPE == 'sgd':
    optim = tf.keras.optimizers.SGD(learning_rate=10e-4)
elif OPTIM_TYPE == 'sgd-momentum':
    optim = tf.keras.optimizers.SGD(learning_rate=10e-4, momentum = 0.9)
elif OPTIM_TYPE == 'sgd-nesterov':
    optim = tf.keras.optimizers.SGD(learning_rate=10e-4, momentum = 0.9, nesterov = True)
elif OPTIM_TYPE == 'sgd-cyclic':
    optim = tf.keras.optimizers.SGD(one_cycle_lr_schedule)
else:
    raise ValueError(f'Invalid input for OPTIMIZER: {OPTIM_TYPE}')

# Compile Model and Train
model.compile(optimizer=optim, loss=loss, metrics='accuracy')
history = model.fit(
    train_data,
    validation_data = valid_data,
    epochs = EPOCHS,
    callbacks=callback_collection
)

# Save model
model.save(f'Models/{MODEL_NAME}_model')