from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class StudentSchema(BaseModel):
    fullname: str = Field(...)
    email: EmailStr = Field(...)

    class Config: 
        schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "jdow@mail.com"
            }
        }


class UpdateStudentModel(BaseModel):
    fullname: Optional[str]
    email: Optional[EmailStr]

    class Config:
        schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "jdow@mail.com"
            }
        }

def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message
    }

def ErrorResponseModel(error, code, message):
    return {"error":error, "code": code, "message": message}