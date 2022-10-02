from fpdf import FPDF

# file_name: string
# text_content: dict<string,string>
def write_report(file_name, text_content):
    pdf = FPDF()
    pdf.add_page()

    # Create title and subtitle
    pdf.set_font('Times', 'B', 36)
    pdf.cell(0, 0, text_content['title'], 0, 1)
    pdf.set_font('Times', 'I', 18)
    pdf.cell(0, 20, text_content['subtitle'] + ' ' + text_content['date'], 0, 1)

    # Write summary
    pdf.set_font('Times', 'B', 18)
    pdf.cell(0, 30, 'Quick Summary', 0, 1)
    pdf.set_font('Times', '', 18)
    pdf.multi_cell(0, 8, text_content['summary'], 0, 1)

    # I
    pdf.set_font('Times', 'B', 18)
    pdf.cell(0, 30, 'Illness Severity', 0, 1)
    pdf.set_font('Times', '', 18)
    pdf.multi_cell(0, 8, text_content['I'], 0, 1)

    # P
    pdf.set_font('Times', 'B', 18)
    pdf.cell(0, 30, 'Patient Summary', 0, 1)
    pdf.set_font('Times', '', 18)
    pdf.multi_cell(0, 8, text_content['P'], 0, 1)

    # A
    pdf.set_font('Times', 'B', 18)
    pdf.cell(0, 30, 'Action List', 0, 1)
    pdf.set_font('Times', '', 18)
    pdf.multi_cell(0, 8, text_content['A'], 0, 1)

    # S
    pdf.set_font('Times', 'B', 18)
    pdf.cell(0, 30, 'Situation Awareness and Contingency Planning', 0, 1)
    pdf.set_font('Times', '', 18)
    pdf.multi_cell(0, 8, text_content['S'], 0, 1)

    # Write to file
    pdf.output(file_name, 'F')

def write_translated_report(file_name, text_content):
    pdf = FPDF()
    pdf.add_page()

    # Create title and subtitle
    pdf.set_font('Times', 'B', 36)
    pdf.cell(0, 0, text_content['title'], 0, 1)
    pdf.set_font('Times', 'I', 18)
    pdf.cell(0, 20, text_content['subtitle'] + ' ' + text_content['date'], 0, 1)

    # Write summary
    pdf.set_font('Times', 'B', 18)
    pdf.cell(0, 30, 'Quick Summary', 0, 1)
    pdf.set_font('Times', '', 18)
    pdf.multi_cell(0, 8, text_content['summary'], 0, 1)

    # Write translation
    pdf.set_font('Arial', 'B', 18)
    pdf.cell(0, 30, 'Translation', 0, 1)
    pdf.set_font('Times', '', 18)
    pdf.multi_cell(0, 8, text_content['translation'], 0, 1)

    # Write to file
    pdf.output(file_name, 'F')