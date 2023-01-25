from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model
from sklearn.metrics import accuracy_score, f1_score, classification_report
import time
import os
import argparse

# Arguments
parser = argparse.ArgumentParser()
parser.add_argument("-p", "--path", help="Test data path", type=str)
parser.add_argument("-s", "--shape", help="Input Shape", type=int, default=512)
parser.add_argument("-c", "--classes", type=int, default=2)
parser.add_argument("-m", "--model", type=str)
parser.add_argument("-b", "--batch_size", type=int, default=8)
args = parser.parse_args()

TEST_IMG_DIR=args.path
CLASS_MODE='sparse' if args.classes != 2 else 'binary'
BATCH_SIZE=args.batch_size
MODEL_NAME=args.model
SHAPE=(args.shape, args.shape)

# Format f1 scores
def format_f1score(f1, classes):
    print()
    for i in range(len(f1)):
        print(f'{classes[i]}: {f1[i]}')

# Load test data
test_data_generator = ImageDataGenerator(rescale=1/255.)
test_data = test_data_generator.flow_from_directory(
                        TEST_IMG_DIR,
                        target_size=SHAPE,
                        batch_size=BATCH_SIZE,
                        class_mode=CLASS_MODE,
                        shuffle=False
                        )

print("Testing Data Indices: ", test_data.class_indices)

# Load model and calculate metrics
if os.path.exists(f'Models/{MODEL_NAME}_model'):
    model = load_model(f"Models/{MODEL_NAME}_model")
    print(f'Successfully loaded {MODEL_NAME}')

    images = len(test_data)

    # Prediction start time
    start_time = time.time()
    predictions = model.predict(x=test_data)
    end_time = time.time()

    # Convert predictions to disease classes
    classes = []
    for pred in predictions:
        cls = list(pred).index(pred.max())
        classes.append(cls)
            
    accuracy = accuracy_score(list(test_data.classes), classes)
    f1 = f1_score(list(test_data.classes), classes, average=None)

    print('Model Name: ', MODEL_NAME)
    print('---------------------------------------------------')
    print('Testing Scores: ')
    print('---------------------------------------------------')
    print('Classification Report')
    print(classification_report(list(test_data.classes), classes))
    print('---------------------------------------------------')
    print('Accuracy: ', accuracy)
    print('---------------------------------------------------')
    print('F1 Score: ', format_f1score(f1, list(test_data.class_indices.keys())))
    print('---------------------------------------------------')
    print('Total Inference Time in ms: ', (end_time-start_time)*1e3)
    print('Inference time for one image in ms: ', ((end_time-start_time)/images)*1e3)
    print('---------------------------------------------------')
else:
    raise ValueError(f"No model named {MODEL_NAME} found!")


