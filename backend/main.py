import fastapi
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse
from fastapi import security
from typing import List
from sqlalchemy import orm
import services, schemas
import os
from PIL import Image

from services import get_db

app = FastAPI()

"""
####################################################################
Platform Statistics APIs
1. Number of Doctors on Platform
2. Number of Patients on Platform
3. Number of patient a Doctor has
4. Number of tests performed by a doctor
5. Total test performed on Platform
####################################################################
"""


@app.get("/api/num_of_doctors")
async def get_num_doctors(db: orm.Session = fastapi.Depends(get_db)):
    return await services.get_num_doctors(db)


@app.get("/api/num_of_patients")
async def get_num_patients(db: orm.Session = fastapi.Depends(get_db)):
    return await services.get_num_patients(db)


@app.get("/api/num_of_tests")
async def get_num_test(db: orm.Session = fastapi.Depends(get_db)):
    return await services.get_num_test(db)


@app.get("/api/doctors/num_of_patients_for_doctor")
async def get_num_patients_for_doctor(
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    return await services.get_num_patients_for_doctor(doctor, db)


@app.get("/api/doctors/num_of_tests_for_doctor")
async def get_num_test_for_doctor(
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    return await services.get_num_test_for_doctor(doctor, db)


"""
####################################################################
Doctor Related APIs
1. Register
2. Generate Token
3. Get logged in Doctor
####################################################################
"""


@app.post("/api/doctors")
async def register_doctor(
    doctor: schemas.DoctorRegistration, db: orm.Session = fastapi.Depends(get_db)
):
    db_doctor = await services.get_doctor_by_email(doctor.email, db)
    if db_doctor:
        raise HTTPException(status_code=400, detail="Email already in use!")
    
    doctor = await services.create_doctor_account(doctor, db)

    return await services.create_token(doctor)


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


"""
####################################################################
Patient related APIs
1. Create
2. Find All
3. Find One
4. Delete
5. Update
####################################################################
"""


@app.post("/api/doctors/create_patient", response_model=schemas.Patient)
async def create_patient_profile(
    patient: schemas.PatientRegistration,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    Create Patient Entry

    args:
    patient: schemas.PatientRegistration
    """
    return await services.create_new_patient(patient, doctor, db)


@app.get("/api/doctors/get_patients", response_model=List[schemas.Patient])
async def get_all_patients_for_doctor(
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    API for getting all patient information
    args:
    patient_id: int

    returns:
    patient_info: List[schemas.Patient]
    """
    return await services.get_patients_for_doctor(doctor, db)


@app.get("/api/doctors/get_patients/{patient_id}", status_code=200)
async def get_single_patient_for_doctor(
    patient_id: int,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    API for getting single patient information

    args:
    patient_id: int

    returns:
    patient_info: schemas.Patient
    """
    return await services.get_patient_for_doctor(patient_id, doctor, db)


@app.get("/api/doctors/get_patients_by_name/{patient_first_name}", status_code=200)
async def get_single_patient_for_doctor_by_name(
    patient_first_name: str,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    API for getting patient information query = first_name

    args:
    patient_id: int

    returns:
    patient_info: schemas.Patient
    """
    return await services.get_patients_for_doctor_by_name(patient_first_name, doctor, db)


@app.delete("/api/doctors/delete_patients/{patient_id}", status_code=204)
async def delete_patient_for_doctor(
    patient_id: int,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    API for deleting a patient

    args:
    patient_id: int
    """
    await services.delete_patient_for_doctor(patient_id, doctor, db)
    return {"message": "Patient successfully deleted"}


@app.put("/api/doctors/update_patients/{patient_id}", status_code=200)
async def update_patient_for_doctor(
    patient_id: int,
    patient: schemas.PatientRegistration,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    API for updating patient information

    args:
    patient_id: int
    patient: schemas.PatientRegistration   # Current patient information

    returns:
    """
    return await services.update_patient_for_doctor(patient_id, patient, doctor, db)


"""
####################################################################
Patient History related APIs
1. Get complete history for one patient.
2. Get a particular history for a patient.
####################################################################
"""


@app.get(
    "/api/doctors/get_complete_patient_history/{patient_id}",
    response_model=List[schemas.PatientHistory],
)
async def get_complete_patient_history_for_doctor(
    patient_id: int,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    API for getting complete patient history

    args:
    patient_id: int

    returns:
    patient_history: List[schemas.PatientHistory]
    """
    return await services.get_complete_patient_history_for_doctor(
        patient_id, doctor, db
    )


@app.get(
    "/api/doctors/get_patient_history/{patient_id}/patient_history/{patient_history_id}",
    status_code=200,
)
async def get_single_patient_history_for_doctor(
    patient_id: int,
    patient_history_id: int,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    API for getting single patient history

    args:
    patient_id: int
    patient_history_id: int

    returns:
    patient_history: schemas.PatientHistory
    """
    return await services.get_single_patient_history_for_doctor(
        patient_history_id, patient_id, doctor, db
    )


"""
####################################################################
Run Model Inference for all tasks
Model APIs
1. Risk
2. Disease, 
3. Nerve 
####################################################################
"""


@app.post("/api/doctors/upload_scan/risk_classification")
async def risk_classification(
    file: UploadFile = File(...),
    patient_id: int = Form(...),
    test_type: str = Form(...),
    description: str = Form(...),
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    API for Running Never Segmentation Model

    args:
    file: uploaded scan
    patient_id: int   # patient_id for a doctors patient
    test_type: str    # Risk Classification
    description: str  # reason for running test

    returns:
    payload: {
        "scan_message": scan_message,
        "report_message": report_message,
        "patient_history": patient_history_registered,
        "message": "Success/Failure"
    }
    """
    patient = await services.get_patient_for_doctor(patient_id, doctor, db)
    if not patient:
        return {"message": f"No patient found with id: {patient_id}!"}

    valid_extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not valid_extension:
        return {"message": "Image must be jpg or png format!"}

    scan = services.read_image(await file.read())
    extension = file.filename.split(".")[-1]
    scan_path = f"scans/{doctor.id}/{patient_id}"

    if not os.path.exists(scan_path):
        os.makedirs(scan_path)

    images = len([f for f in os.listdir(scan_path) if f != ".DS_Store"])
    file_name = f"{images}.{extension}"
    saved_scan_path = os.path.join(scan_path, file_name)
    scan_message = services.save_image(scan, saved_scan_path)

    report_path = f"reports/{doctor.id}/{patient_id}"
    file_name = f"{images}.pdf"
    prediction = services.predict_risk(saved_scan_path)
    if not os.path.exists(report_path):
        os.makedirs(report_path)
    saved_report_path = os.path.join(report_path, file_name)

    data = (
        ("**First Name**", "**Last Name**", "**Patient ID**", "**Phone Number**"),
        (patient.first_name, patient.last_name, patient_id, patient.phone_number),
        ("**Weight**", "**Height**", "**Gender**", "**Age**"),
        (patient.weight, patient.height, patient.gender, patient.age),
        ("**History**", patient.history),
        ("**Allergies**", patient.alergies),
    )
    scan = Image.fromarray(scan)
    report_message = services.generate_report(
        data, scan, prediction, saved_report_path, "risk_classification"
    )

    patient_history = schemas.PatientHistoryRegistration(
        patient_id=patient_id, test_type=test_type, description=description
    )
    patient_history_registered = await services.create_new_patient_history(
        patient_history, saved_scan_path, saved_report_path, doctor, db
    )

    return {
        "scan_message": scan_message,
        "report_message": report_message,
        "patient_history": patient_history_registered,
        "message": "Successfully created patient history!",
    }


@app.post("/api/doctors/upload_scan/disease_detection")
async def disease_detection(
    file: UploadFile = File(...),
    patient_id: int = Form(...),
    test_type: str = Form(...),
    description: str = Form(...),
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    API for Running Never Segmentation Model

    args:
    file: uploaded scan
    patient_id: int   # patient_id for a doctors patient
    test_type: str    # Disease Detection
    description: str  # reason for running test

    returns:
    payload: {
        "scan_message": scan_message,
        "report_message": report_message,
        "patient_history": patient_history_registered,
        "message": "Success/Failure"
    }
    """
    patient = await services.get_patient_for_doctor(patient_id, doctor, db)
    if not patient:
        return {"message": f"No patient found with id: {patient_id}!"}

    valid_extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not valid_extension:
        return {"message": "Image must be jpg or png format!"}

    scan = services.read_image(await file.read())
    extension = file.filename.split(".")[-1]
    scan_path = f"scans/{doctor.id}/{patient_id}"

    if not os.path.exists(scan_path):
        os.makedirs(scan_path)

    images = len([f for f in os.listdir(scan_path) if f != ".DS_Store"])
    file_name = f"{images}.{extension}"
    saved_scan_path = os.path.join(scan_path, file_name)
    scan_message = services.save_image(scan, saved_scan_path)

    report_path = f"reports/{doctor.id}/{patient_id}"
    file_name = f"{images}.pdf"
    prediction = services.predict_disease(saved_scan_path)
    if not os.path.exists(report_path):
        os.makedirs(report_path)
    saved_report_path = os.path.join(report_path, file_name)

    data = (
        ("**First Name**", "**Last Name**", "**Patient ID**", "**Phone Number**"),
        (patient.first_name, patient.last_name, patient_id, patient.phone_number),
        ("**Weight**", "**Height**", "**Gender**", "**Age**"),
        (patient.weight, patient.height, patient.gender, patient.age),
        ("**History**", patient.history),
        ("**Allergies**", patient.alergies),
    )
    scan = Image.fromarray(scan)
    report_message = services.generate_report(
        data, scan, prediction, saved_report_path, "disease_detection"
    )

    patient_history = schemas.PatientHistoryRegistration(
        patient_id=patient_id, test_type=test_type, description=description
    )
    patient_history_registered = await services.create_new_patient_history(
        patient_history, saved_scan_path, saved_report_path, doctor, db
    )

    return {
        "scan_message": scan_message,
        "report_message": report_message,
        "patient_history": patient_history_registered,
        "message": "Successfully created patient history!",
    }


@app.post("/api/doctors/upload_scan/nerve_segmentation")
async def nerve_segmentation(
    file: UploadFile = File(...),
    patient_id: int = Form(...),
    test_type: str = Form(...),
    description: str = Form(...),
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    API for Running Never Segmentation Model

    args:
    file: uploaded scan
    patient_id: int   # patient_id for a doctors patient
    test_type: str    # Never Segmentation
    description: str  # reason for running test

    returns:
    payload: {
        "scan_message": scan_message,
        "report_message": report_message,
        "patient_history": patient_history_registered,
        "message": "Success/Failure"
    }
    """
    patient = await services.get_patient_for_doctor(patient_id, doctor, db)
    if not patient:
        return {"message": f"No patient found with id: {patient_id}!"}

    valid_extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not valid_extension:
        return {"message": "Image must be jpg or png format!"}

    scan = services.read_image(await file.read())
    extension = file.filename.split(".")[-1]
    scan_path = f"scans/{doctor.id}/{patient_id}"

    if not os.path.exists(scan_path):
        os.makedirs(scan_path)

    images = len([f for f in os.listdir(scan_path) if f != ".DS_Store"])
    file_name = f"{images}.{extension}"
    saved_scan_path = os.path.join(scan_path, file_name)
    scan_message = services.save_image(scan, saved_scan_path)

    report_path = f"reports/{doctor.id}/{patient_id}"
    file_name = f"{images}.pdf"
    prediction = services.predict_segmentation(saved_scan_path)
    if not os.path.exists(report_path):
        os.makedirs(report_path)
    saved_report_path = os.path.join(report_path, file_name)
    data = (
        ("**First Name**", "**Last Name**", "**Patient ID**", "**Phone Number**"),
        (patient.first_name, patient.last_name, patient_id, patient.phone_number),
        ("**Weight**", "**Height**", "**Gender**", "**Age**"),
        (patient.weight, patient.height, patient.gender, patient.age),
        ("**History**", patient.history),
        ("**Allergies**", patient.alergies),
    )

    scan = Image.fromarray(scan)
    prediction = Image.fromarray(prediction)
    prediction.save("x.png")
    report_message = services.generate_report(
        data, scan, prediction, saved_report_path, "nerve_segmentation"
    )

    patient_history = schemas.PatientHistoryRegistration(
        patient_id=patient_id, test_type=test_type, description=description
    )

    patient_history_registered = await services.create_new_patient_history(
        patient_history, saved_scan_path, saved_report_path, doctor, db
    )

    return {
        "scan_message": scan_message,
        "report_message": report_message,
        "patient_history": patient_history_registered,
        "message": "Successfully created patient history!",
    }


"""
####################################################################
Patient Report and Scan Downloading APIs
1. Download Scan
2. Download Report
####################################################################
"""


@app.get(
    "/api/doctors/download_scan/patient/{patient_id}/patient_history/{patient_history_id}"
)
async def download_scan(
    patient_id: int,
    patient_history_id: int,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    API for downloading a patients scan
    """
    patient_history = await services.get_single_patient_history_for_doctor(
        patient_history_id, patient_id, doctor, db
    )
    scan_path = patient_history.scan_path

    return FileResponse(scan_path, media_type="image/png/jpg")


@app.get(
    "/api/doctors/download_report/patient/{patient_id}/patient_history/{patient_history_id}"
)
async def download_report(
    patient_id: int,
    patient_history_id: int,
    doctor: schemas.Doctor = fastapi.Depends(services.get_current_doctor),
    db: orm.Session = fastapi.Depends(get_db),
):
    """
    API for downloading a patients report
    """
    patient_history = await services.get_single_patient_history_for_doctor(
        patient_history_id, patient_id, doctor, db
    )
    report_path = patient_history.report_path

    return FileResponse(report_path, media_type="application/pdf")
