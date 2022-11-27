# Multi-Disease Detection Using Retinal Fundus Scans - (MDDRFS)

### Data Reference
The reference data has been uploaded to the Final Year drive. The Retinal Fundus Images Dataset contains images for [Multi Disease Classification](https://drive.google.com/drive/folders/1eMeRzGTF54cKfhUai8lg2bJwYsHUlP18?usp=sharing) and [Nerve Segementation](https://drive.google.com/drive/folders/1SyB0az9RY-j3BsRTdH0m-deUhHzAH2f9?usp=sharing) folder contains images, masks and lables for nerve segmentation. 

Data Sources:
Segmentation:
1. [High-Resolution Fundus (HRF) Image Database](https://www5.cs.fau.de/research/data/fundus-images/)
2. [Drive Grand Challenege](https://drive.grand-challenge.org/Download/)
3. [PAPILA: Dataset with fundus images and clinical data of both eyes of the same patient for glaucoma assessment](https://pubmed.ncbi.nlm.nih.gov/35680965/)

Classification:
1. [Retinal Image Analysis for multi-Disease Detection Challenge](https://riadd.grand-challenge.org/Download/)
2. [FIVES: A Fundus Image Dataset for Artificial Intelligence based Vessel Segmentation](https://www.nature.com/articles/s41597-022-01564-3#Sec7)
3. [Retinal fundus images for glaucoma analysis: the RIGA dataset](https://deepblue.lib.umich.edu/data/concern/data_sets/3b591905z)


### Model Reference Page:
We will be using Tensorflow Keras for performing our experiments so please refere to the [Keras Applications](https://keras.io/api/applications/) Page for the same. All the code snippets for using models is available there. Models that we will be experimenting with are as follows:

Models:

1. ResNet152V2
2. EfficientNetB7
3. MobileNetV2
4. Densnet201
5. XceptionNet
6. EfficientNetV2 (S, M, L)
7. ConvNeXt (Tiny, Small, Base) - Latest Addition to Keras

Lightweight Architectures:

1. MobileNetV2
2. EfficientNetS
3. ConvNeXtSmall/Base

### Tasks:

### Augmentations:
1. Rotate
2. Flip Horizontal
3. Flip Vertical
4. Center Crop
5. Contrast/Brightness

### Binary Image Classification:
1. Transfer Learning
2. Traning From Scratch
3. Ensemble Best Models

### Multi-Class Classification:
1. Transfer Learning
2. Traning From Scratch
3. Ensemble Best Models

### Nerve Segmentation:
1. UNet
2. REDNet

