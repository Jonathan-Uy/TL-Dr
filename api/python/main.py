# convert pdf files to text files, clean them, and return them

import PyPDF2
import os

rel_path = os.path.realpath(os.path.join(os.path.dirname(__file__)\
    , '..','..','samples','1.pdf'))

pdffileobj = open(rel_path,'rb')

pdfreader = PyPDF2.PdfFileReader(pdffileobj)

numpages = pdfreader.numPages

pageobj = pdfreader.getPage(0)

text = pageobj.extractText()

print(text)

pdffileobj.close()

