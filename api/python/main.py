from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import json
import base64

from functions import base64_to_cleantext
from create_report import write_report, write_translated_report

class Clean_PDF_Request(BaseModel):
  pdf: str

class Generate_PDF_Request(BaseModel):
  report_data: str

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/clean-pdf")
def clean_pdf(clean_pdf_request: Clean_PDF_Request):
  output = base64_to_cleantext(clean_pdf_request.pdf)
  return output

# Takes in JSON string and produces a base64 encoded PDF
@app.post("/generate-handoff")
def generate_handoff(generate_pdf_request: Generate_PDF_Request):
  decoded_data = generate_pdf_request.report_data.encode('latin-1', 'replace').decode('latin-1')
  dataDict = json.loads(decoded_data)
  print(dataDict)
  cur_time = datetime.now().strftime("%d-%m-%Y_%H-%M-%S")
  file_name = './files/' + cur_time + '.pdf'
  write_report(file_name, dataDict)
  with open(file_name, "rb") as pdf_file:
    encoded_string = base64.b64encode(pdf_file.read())
    return encoded_string

@app.post("/generate-summary")
def generate_summary(generate_pdf_request: Generate_PDF_Request):
  dataDict = json.loads(generate_pdf_request.report_data)
  cur_time = datetime.now().strftime("%d-%m-%Y_%H-%M-%S")
  file_name = './files/' + cur_time + '.pdf'
  write_translated_report(file_name, dataDict)
  with open(file_name, "rb") as pdf_file:
    encoded_string = base64.b64encode(pdf_file.read())
    return encoded_string