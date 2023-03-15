from pydantic import BaseModel
from datetime import datetime


class DoctorAuth(BaseModel):
    email: str
    password: str


class DoctorRegistration(BaseModel):
    email: str
    hashed_password: str
    first_name: str
    last_name: str
    age: str
    phone_number: str
    qualification: str


class Doctor(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    age: str
    phone_number: str
    qualification: str

    class Config:
        orm_mode = True


class PatientRegistration(BaseModel):
    email: str
    first_name: str
    last_name: str
    age: int
    phone_number: str
    alergies: str
    history: str
    gender: str
    weight: float
    height: float


class Patient(BaseModel):
    id: int
    doctor_id: int
    email: str
    first_name: str
    last_name: str
    age: int
    phone_number: str
    alergies: str
    history: str
    gender: str
    weight: float
    height: float

    class Config:
        orm_mode = True


class PatientHistoryRegistration(BaseModel):
    patient_id: int
    test_type: str
    description: str

    class Config:
        orm_mode = True


class PatientHistory(BaseModel):
    id: int
    patient_id: int
    doctor_id: int
    test_type: str
    description: str
    scan_path: str
    report_path: str
    date: datetime

    class Config:
        orm_mode = True
