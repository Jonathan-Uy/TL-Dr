# convert pdf files to text files, clean them, and return them

import PyPDF2
import os

def process_pdf(pdf_name):

    rel_path = os.path.realpath(os.path.join(os.path.dirname(__file__)\
        , '..','..','samples',pdf_name))

    pdffileobj = open(rel_path,'rb')

    pdfreader = PyPDF2.PdfFileReader(pdffileobj)

    numpages = pdfreader.numPages

    full_txt = ''

    for i in range(numpages):

        pageobj = pdfreader.pages[i]

        page_txt = pageobj.extractText()

        full_txt += page_txt

    pdffileobj.close()

    full_txt = full_txt.replace('\n','')

    return full_txt

