from base64 import b64decode    # Used in Step 1
from datetime import datetime   # Used to give unique file names
import PyPDF2                   # Used in Step 2

# MongoDB stores PDFs as base64 strings
# We convert it to clean text to feed to OpenAI in three steps
#   1. Generate the PDF and write it in ./files/
#   2. Grab the text from the PDF, return as a string
#   3. Clean the text, return as a string (not implemented yet!)
def base64_to_cleantext(base64_pdf):
    file_name = write_pdf(base64_pdf)
    return clean_up(grab_text(file_name))

# Step 1: Generate PDF (base64 -> string, return file name)
def write_pdf(base64_pdf):
    bytes = b64decode(base64_pdf, validate=True)
    cur_time = datetime.now().strftime("%d-%m-%Y_%H-%M-%S")
    file_name = './files/' + cur_time + '.pdf'
    f = open(file_name, 'wb')
    f.write(bytes)
    f.close()
    return file_name

# Step 2: Grab text from PDF (string -> string, take file name as input)
def grab_text(file_name):
    pdf_fileobj = open(file_name,'rb')
    pdf_reader = PyPDF2.PdfFileReader(pdf_fileobj)
    numpages = pdf_reader.numPages

    # Add text from each page
    full_txt = ''
    for i in range(numpages):
        pageobj = pdf_reader.pages[i]
        page_txt = pageobj.extractText()
        full_txt += page_txt

    pdf_fileobj.close()
    return full_txt

# NOT PERFECT
# Step 3: Dirty text to clean (string -> string)
# We may choose to use an existing solution, or employ
# heuristics specific to medical note formatting.
def clean_up(dirty_text):
    return " ".join(dirty_text.split())