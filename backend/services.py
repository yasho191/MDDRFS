import database
from sqlalchemy import orm
import models
import schemas
from passlib import hash
import fastapi
from fastapi import security, HTTPException
from fastapi.responses import FileResponse
import jwt
from PIL import Image
from io import BytesIO
import os
import tensorflow as tf
from fpdf import FPDF
import numpy as np


JWT_SECRET = "mysecret"
oauth2schema = security.OAuth2PasswordBearer(tokenUrl="/api/token")

'''
----------------------------------------------------------------
Model Loading
----------------------------------------------------------------
'''
disease_model = tf.keras.models.load_model('tf_models/multiclass_classification/mobilenet_model', compile=False)
risk_model = tf.keras.models.load_model('tf_models/binary_classification/efficientnetv2m_model')     
# segmentation_model = tf.keras.models.load_model('tf_models/segmentation_model')


"""
----------------------------------------------------------------
Database configuration
----------------------------------------------------------------
"""
def create_database():
    return database.Base.metadata.create_all(bind=database.engine)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


"""
----------------------------------------------------------------
Functions for Image loading and saving
----------------------------------------------------------------
"""
def read_image(file):
    file = BytesIO(file)
    image = Image.open(file)
    image = image.convert('RGB')
    l,h = image.size
    dif = abs(l-h)//2
    image = image.crop([dif,0,l-dif,h])
    return np.array(image)


def save_image(image, scan_path):
    image = Image.fromarray(image)
    image.save(scan_path)
    return "File Saved Sucessfully!"


"""
----------------------------------------------------------------
Inference Functions - Deep learning models
----------------------------------------------------------------
"""
def load_model(type: str):
    if type == "risk":
        risk_model = tf.keras.models.load_model('tf_models/binary_classification/efficientnetv2m_model')
        return risk_model
    elif type == "disease":
        disease_model = tf.keras.models.load_model('tf_models/multiclass_classification/efficientnetv2m_model')
        return disease_model
    elif type == "segmentation":
        segmentation_model = tf.keras.models.load_model('tf_models/segmentation_model')
        return segmentation_model
    else:
        raise ValueError(f"Invalid model type {type}")


def predict_risk(image: np.ndarray):
    # convert image
    image = np.resize(image, (360, 360, 3))
    # image = image/255.
    image = np.expand_dims(image, 0)
    
    # Run prediction
    pred = risk_model.predict(image)
    if pred[0][0] > 0.1:
        return f"No Risk - Your Eyes are safe!"
    else:
        return f"Risk - You might be at a risk of opthalmic disease!"


def predict_disease(image: Image.Image):
    # convert image
    image = np.resize(image, (360, 360, 3))
    image = np.expand_dims(image, 0)
    image = image/255.
    # Run prediction
    mapping = {'ARMD': 0, 'BRVO': 1, 'CRS': 2, 'CRVO': 3, 'CSR': 4, 'DN': 5, 'DR': 6, 'LS': 7, 'MH': 8, 'MYA': 9, 'ODC': 10, 'ODE': 11, 'ODP': 12, 'OTHER': 13, 'RPEC': 14, 'RS': 15, 'TSLN': 16}
    pred = disease_model.predict(image)

    i = 0
    for key in mapping.keys():
        mapping[key] = pred[0][i]
        i += 1
    return mapping


def predict_segmentation(image: Image.Image):
    return image


"""
----------------------------------------------------------------
Doctor Functions:
- Authentication and Authorization
- Create Doctor
----------------------------------------------------------------
"""
async def get_doctor_by_email(email: str, db: orm.Session):
    return db.query(models.Doctor).filter(models.Doctor.email == email).first()


async def create_doctor_account(doctor: schemas.DoctorRegistration, db: orm.Session):

    check_email = (
        db.query(models.Doctor).filter(models.Doctor.email == doctor.email).first()
    )

    if check_email:
        raise HTTPException(status_code=400, detail="Email already in use!")

    doctor_obj = models.Doctor(
        email=doctor.email,
        hashed_password=hash.bcrypt.hash(doctor.hashed_password),
        first_name=doctor.first_name,
        last_name=doctor.last_name,
        age=doctor.age,
        phone_number=doctor.phone_number,
        qualification=doctor.qualification,
    )

    db.add(doctor_obj)
    db.commit()
    db.refresh(doctor_obj)
    return doctor_obj


async def authenticate_doctor(email: str, password: str, db: orm.Session):
    doctor = await get_doctor_by_email(email, db)

    if not doctor:
        return False

    if not doctor.verify_password(password):
        return False

    return doctor


async def create_token(doctor: models.Doctor):
    doctor_obj = schemas.Doctor.from_orm(doctor)
    token = jwt.encode(doctor_obj.dict(), JWT_SECRET)
    return dict(access_token=token, token_type="bearer")


async def get_current_doctor(
    db: orm.Session = fastapi.Depends(get_db),
    token: str = fastapi.Depends(oauth2schema),
):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        doctor = db.query(models.Doctor).get(payload["id"])
    except:
        raise HTTPException(status_code=401, detail="Invalid credentials!")

    return schemas.Doctor.from_orm(doctor)

"""
----------------------------------------------------------------
Patient Related Services
- Create a Patient
- Update a Patient
- Delete a Patient
- List a Patient
----------------------------------------------------------------
"""

async def create_new_patient(
    patient: schemas.PatientRegistration, doctor: schemas.Doctor, db: orm.Session
):
    check_email = (
        db.query(models.Patient).filter(models.Patient.email == patient.email).first()
    )

    if check_email:
        raise HTTPException(status_code=400, detail="Email already in use!")

    patient_schema = patient.dict()
    patient_schema["doctor_id"] = doctor.id
    patient_obj = models.Patient(**patient_schema)

    db.add(patient_obj)
    db.commit()
    db.refresh(patient_obj)

    return schemas.Patient.from_orm(patient_obj)


async def get_patients_for_doctor(doctor: schemas.Doctor, db: orm.Session):
    patients = (
        db.query(models.Patient).filter(models.Patient.doctor_id == doctor.id).all()
    )

    return list(map(schemas.Patient.from_orm, patients))


async def patient_selector(patient_id: int, doctor: schemas.Doctor, db: orm.Session):
    patient = (
        db.query(models.Patient)
        .filter(models.Patient.doctor_id == doctor.id)
        .filter(models.Patient.id == patient_id)
        .first()
    )

    if patient is None:
        raise HTTPException(status_code=404, detail="Patient does not exist!")

    return patient


async def get_patient_for_doctor(
    patient_id: int, doctor: schemas.Doctor, db: orm.Session
):
    patient = await patient_selector(patient_id, doctor, db)

    return schemas.Patient.from_orm(patient)


async def delete_patient_for_doctor(
    patient_id: int, doctor: schemas.Doctor, db: orm.Session
):
    patient = await patient_selector(patient_id, doctor, db)

    db.delete(patient)
    db.commit()


async def update_patient_for_doctor(
    patient_id: int,
    patient: schemas.PatientRegistration,
    doctor: schemas.Doctor,
    db: orm.Session,
):
    patient_db = await patient_selector(patient_id, doctor, db)

    patient_db.email = patient.email
    patient_db.first_name = patient.first_name
    patient_db.last_name = patient.last_name
    patient_db.age = patient.age
    patient_db.phone_number = patient.phone_number
    patient_db.alergies = patient.alergies
    patient_db.history = patient.history

    db.commit()
    db.refresh(patient_db)

    return schemas.Patient.from_orm(patient_db)


"""
----------------------------------------------------------------
Patient History Functions
- Create a Patient History
- Show a Patient History
----------------------------------------------------------------
"""
async def create_new_patient_history(
    patient_history: schemas.PatientHistoryRegistration,
    scan_path: str,
    report_path: str,
    doctor: schemas.Doctor,
    db: orm.Session,
):
    patient_history_schema = patient_history.dict()
    patient_history_schema["doctor_id"] = doctor.id
    patient_history_schema["scan_path"] = scan_path
    patient_history_schema["report_path"] = report_path
    patient_history_obj = models.PatientHistory(**patient_history_schema)

    db.add(patient_history_obj)
    db.commit()
    db.refresh(patient_history_obj)

    return schemas.PatientHistory.from_orm(patient_history_obj)


async def patient_history_selector(patient_history_id: int, patient_id: int, doctor: schemas.Doctor, db: orm.Session):
    patient_history = (
        db.query(models.PatientHistory)
        .filter(models.PatientHistory.doctor_id == doctor.id)
        .filter(models.PatientHistory.patient_id == patient_id)
        .filter(models.PatientHistory.id == patient_history_id)
        .first()
    )

    return patient_history


async def get_patients_history_for_doctor(patient_id: int, doctor: schemas.Doctor, db: orm.Session):
    patient_history = (
        db.query(models.PatientHistory)
        .filter(models.PatientHistory.doctor_id == doctor.id)
        .filter(models.PatientHistory.patient_id == patient_id)
        .all()
    )

    return list(map(schemas.PatientHistory.from_orm, patient_history))


async def get_patient_history_for_doctor(patient_history_id: int, patient_id: int, doctor: schemas.Doctor, db: orm.Session):
    patient_history = await patient_history_selector(patient_history_id, patient_id, doctor, db)

    return schemas.PatientHistory.from_orm(patient_history)

"""
Download Files
- Scans 
- Reports
"""
def download_scans(path: str):
    return FileResponse(path)

def download_reports(path: str):
    return FileResponse(path)

"""
Generate Reports
"""
def generate_report(prediction, report_path):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    if type(prediction) == type(dict()):
        i = 0
        for key in prediction.keys():
            pred = str(prediction[key])
            w = 40
            h = 10
            pdf.cell(w, h, f'{key}: {pred}')
            pdf.ln(10)
    else:
        pdf.cell(40, 10, str(prediction))
    pdf.output(report_path, 'F')
    return "Report generated sucessfully!"