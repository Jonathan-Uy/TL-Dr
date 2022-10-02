from fastapi import FastAPI
from pydantic import BaseModel

from functions import base64_to_cleantext

class Clean_PDF_Request(BaseModel):
  pdf: str

class Generate_PDF_Request(BaseModel):
  pdf: str

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/clean-pdf")
def clean_pdf(clean_pdf_request: Clean_PDF_Request):
  output = base64_to_cleantext(clean_pdf_request.pdf)
  return output

# Takes in JSON string and produces a base64 encoded PDF
# @app.post("/generate-pdf")
# def generate_pdf():