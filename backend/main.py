import fastapi
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse, StreamingResponse
from fastapi import security
from typing import List
from sqlalchemy import orm
import services, schemas
import os
from fpdf import FPDF

from services import get_db

app = FastAPI()


@app.post("/api/doctors")
async def register_doctor(
    doctor: schemas.DoctorRegistration, db: orm.Session = fastapi.Depends(get_db)
):
    db_doctor = await services.get_doctor_by_email(doctor.email, db)
    if db_doctor:
        raise HTTPException(status_code=400, detail="Email already in use!")

    return await services.create_doctor_account(doctor, db)


@app.post("/api/token")
async def generate_token(
    form_data: security.OAuth2PasswordRequestForm = fastapi.Depends(),
    db: orm.Session = fastapi.Depends(get_db),
):
    doctor = await services.authenticate_doctor(
        form_data.username, form_data.password, db
    )

    if not doctor:
        raise HTTPException(status_code=401, detail="Invalid credentials!")

    return await services.create_token(doctor)


@app.get("/api/doctors/doctor", response_model=schemas.Doctor)
async def get_current_doctor(
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
):
    return doctor


@app.post("/api/doctors/create_patient", response_model=schemas.Patient)
async def create_patient_profile(
    patient: schemas.PatientRegistration,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    return await services.create_new_patient(patient, doctor, db)


@app.get("/api/doctors/get_patients", response_model=List[schemas.Patient])
async def get_patients_for_doctor(
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db)
):
    return await services.get_patients_for_doctor(doctor, db)


@app.get("/api/doctors/get_patients/{patient_id}", status_code=200)
async def get_patient_for_doctor(
    patient_id: int,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db)
):
    return await services.get_patient_for_doctor(patient_id, doctor, db)


@app.delete("/api/doctors/delete_patients/{patient_id}", status_code=204)
async def delete_patient_for_doctor(
    patient_id: int,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db)
):
    await services.delete_patient_for_doctor(patient_id, doctor, db)
    return {"message": "Patient successfully deleted"}


@app.put("/api/doctors/update_patients/{patient_id}", status_code=200)
async def update_patient_for_doctor(
    patient_id: int,
    patient: schemas.PatientRegistration,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db)
):
    return await services.update_patient_for_doctor(patient_id, patient, doctor, db)


@app.post("/api/doctors/upload_scan/risk_classification")
async def risk_classification(
    file: UploadFile = File(...),
    patient_id:int = Form(...),
    test_type: str = Form(...),
    description: str = Form(...),
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),   
):
    patient = await services.get_patient_for_doctor(patient_id, doctor, db)
    if not patient:
        return {"message": f"No patient found with id: {patient_id}!"}

    valid_extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not valid_extension:
        return {"message": "Image must be jpg or png format!"}

    scan = services.read_image(await file.read())
    extension = file.filename.split(".")[-1]
    scan_path = f'scans/{doctor.id}/{patient_id}'
    
    if not os.path.exists(scan_path):
        os.makedirs(scan_path)

    images = len([f for f in os.listdir(scan_path) if f != '.DS_Store'])
    file_name = f'{images}.{extension}'
    saved_scan_path = os.path.join(scan_path, file_name)
    scan_message = services.save_image(scan, saved_scan_path)
    

    report_path = f'reports/{doctor.id}/{patient_id}'
    file_name = f'{images}.pdf'
    prediction = services.predict_risk(scan)
    if not os.path.exists(report_path):
        os.makedirs(report_path)
    saved_report_path = os.path.join(report_path, file_name)
    report_message = services.generate_report(prediction, saved_report_path)

    patient_history = schemas.PatientHistoryRegistration(
        patient_id=patient_id,
        test_type=test_type,
        description=description
    )
    patient_history_registered = await services.create_new_patient_history(patient_history, saved_scan_path, saved_report_path, doctor, db)

    return {
        "scan_message": scan_message,
        "report_message": report_message,
        "patient_history": patient_history_registered,
        "message": "Successfully created patient history!"
        }


@app.post("/api/doctors/upload_scan/disease_detection")
async def disease_detection(
    file: UploadFile = File(...),
    patient_id:int = Form(...),
    test_type: str = Form(...),
    description: str = Form(...),
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),   
):
    patient = await services.get_patient_for_doctor(patient_id, doctor, db)
    if not patient:
        return {"message": f"No patient found with id: {patient_id}!"}

    valid_extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not valid_extension:
        return {"message": "Image must be jpg or png format!"}

    scan = services.read_image(await file.read())
    extension = file.filename.split(".")[-1]
    scan_path = f'scans/{doctor.id}/{patient_id}'
    
    if not os.path.exists(scan_path):
        os.makedirs(scan_path)

    images = len([f for f in os.listdir(scan_path) if f != '.DS_Store'])
    file_name = f'{images}.{extension}'
    saved_scan_path = os.path.join(scan_path, file_name)
    scan_message = services.save_image(scan, saved_scan_path)
    

    report_path = f'reports/{doctor.id}/{patient_id}'
    file_name = f'{images}.pdf'
    prediction = services.predict_disease(scan)
    if not os.path.exists(report_path):
        os.makedirs(report_path)
    saved_report_path = os.path.join(report_path, file_name)
    report_message = services.generate_report(prediction, saved_report_path)

    patient_history = schemas.PatientHistoryRegistration(
        patient_id=patient_id,
        test_type=test_type,
        description=description
    )
    patient_history_registered = await services.create_new_patient_history(patient_history, saved_scan_path, saved_report_path, doctor, db)

    return {
        "scan_message": scan_message,
        "report_message": report_message,
        "patient_history": patient_history_registered,
        "message": "Successfully created patient history!"
        }

@app.post("/api/doctors/upload_scan/nerve_segmentation")
async def nerve_segmentation(
    patient_history: schemas.PatientHistoryRegistration,
    file: UploadFile = File(...),
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db)
):
    patient = await services.get_patient_for_doctor(patient_history.patient_id, doctor, db)
    if not patient:
        return {"message": f"No patient found with id: {patient_history.patient_id}!"}

    valid_extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not valid_extension:
        return {"message": "Image must be jpg or png format!"}

    scan = services.read_image(await file.read())
    extension = file.filename.split(".")[-1]
    scan_path = f'scans/{doctor.id}/{patient_history.patient_id}'

    if not os.path.exists(scan_path):
        os.makedirs(scan_path)

    images = len([f for f in os.listdir(scan_path) if f != '.DS_Store'])
    file_name = f'{images}.{extension}'
    scan_message = services.save_image(await file.read(), scan_path, file_name)

    report_path = f'reports/{doctor.id}/{patient_history.patient_id}'
    prediction = services.predict_segmentation(scan)
    if not os.path.exists(report_path):
        os.makedirs(report_path)

    patient_history_registered = await services.create_new_patient_history(patient_history, scan_path, report_path, doctor, db)

    return {
        "scan_message": scan_message,
        "report_message": "Report successfully created!",
        "patient_history": patient_history_registered,
        "message": "Successfully created patient history!"
        }


@app.get("/api/doctors/download_scan/patient/{patient_id}/patient_history/{patient_history_id}")
async def download_scan(
    patient_id: int,
    patient_history_id: int,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db)
):
    patient_history = await services.get_patient_history_for_doctor(patient_history_id, patient_id, doctor, db)
    scan_path = patient_history.scan_path
    
    return FileResponse(scan_path, media_type='image/png/jpg')


@app.get("/api/doctors/download_report/patient/{patient_id}/patient_history/{patient_history_id}")
async def download_report(
    patient_id: int,
    patient_history_id: int,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db)
):
    patient_history = await services.get_patient_history_for_doctor(patient_history_id, patient_id, doctor, db)
    report_path = patient_history.report_path
    
    return FileResponse(report_path, media_type='application/pdf')