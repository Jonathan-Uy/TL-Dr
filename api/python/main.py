# convert pdf files to text files, clean them, and return them

import PyPDF2
import os


pdffileobj = input_file.read()

pdfreader = PyPDF2.PdfFileReader(pdffileobj)

numpages = pdfreader.numPages

pageobj = pdfreader.getPage(x + 1)

text = pageobj.extractText()

file1 = open(r"../../samples/1.txt","a")

file1.writelines(text)
