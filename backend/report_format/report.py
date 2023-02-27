from fpdf import FPDF
prediction = {'ARMD': 0, 'BRVO': 1, 'CRS': 2, 'CRVO': 3, 'CSR': 4, 'DN': 5, 'DR': 6, 'LS': 7, 'MH': 8, 'MYA': 9, 'ODC': 10, 'ODE': 11, 'ODP': 12, 'OTHER': 13, 'RPEC': 14, 'RS': 15, 'TSLN': 16}

def generate_report(prediction, report_path):
    data = (
        ("**First Name**", "**Last Name**", "**Patient ID**", "**Phone Number**"),
        ("Jules", "Smith", "34", "+91 9822943490"),
        ("**Weight**", "**Height**", "**Gender**", "**Age**"),
        ("54", "176", "Male", "24"),
        ("**History**", ""),
        ("**Allergies**", "1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\n2. A pellentesque sit amet porttitor. Felis donec et odio pellentesque diam. Tincidunt praesent semper feugiat nibh sed. Nullam vehicula ipsum a arcu cursus. Sed enim ut sem viverra. \n\n3. Vel eros donec ac odio tempor orci dapibus ultrices. Venenatis lectus magna fringilla urna porttitor rhoncus. Dolor morbi non arcu risus quis varius quam quisque. Non arcu risus quis varius. \n\n4. Erat imperdiet sed euismod nisi porta lorem mollis aliquam. Mauris a diam maecenas sed. Congue nisi vitae suscipit tellus mauris. Sodales neque sodales ut etiam sit. Accumsan lacus vel facilisis volutpat. \n\n5. Odio pellentesque diam volutpat commodo sed. Morbi non arcu risus quis varius."),
    )
    '''
    doctor_id = Column(Integer, ForeignKey("doctors.id", ondelete='CASCADE'), nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    alergies = Column(String, nullable=True)
    history = Column(String, nullable=True)
    '''

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Times", size=20)
    line_height = pdf.font_size * 2.5
    col_width = (pdf.w - 2*pdf.l_margin) / 4  # distribute content evenly

    
    pdf.cell(col_width*4, line_height, "Patient History Report", align='C')
    pdf.ln(line_height)

    pdf.set_font("Times", size=15)
    pdf.cell(col_width*4, line_height, "Patient Information")
    pdf.ln(line_height)

    pdf.set_font("Times", size=10)
    line_height = pdf.font_size * 2.5

    i = 0
    for row in data:
        for datum in row:
            if i == 16:
                break
            pdf.multi_cell(col_width, line_height, datum, border=1,
                new_x="RIGHT", new_y="TOP", max_line_height=pdf.font_size, markdown=True)
            i+=1
        
        pdf.ln(line_height)
        if i == 16:
            pdf.ln(line_height)
            break

    pdf.set_font("Times", size=15)
    pdf.cell(col_width*4, line_height, "Patient History")
    pdf.ln(line_height)

    pdf.set_font("Times", size=10)
    line_height = pdf.font_size * 2.5
    pdf.multi_cell(col_width*4, line_height, data[4][1], border=1,
                new_x="RIGHT", new_y="TOP", max_line_height=pdf.font_size*1.5, markdown=True)
    pdf.ln(line_height)
    pdf.ln(line_height)

    pdf.set_font("Times", size=15)
    pdf.cell(col_width*4, line_height, "Patient Allergies")
    pdf.ln(line_height)

    pdf.set_font("Times", size=10)
    line_height = pdf.font_size * 2.5
    pdf.multi_cell(col_width*4, line_height, data[5][1], border=1,
                new_x="RIGHT", new_y="TOP", max_line_height=pdf.font_size*1.5, markdown=True)
    pdf.ln(line_height)
    pdf.ln(line_height)
    pdf.ln(line_height)
    pdf.ln(line_height)
    pdf.ln(line_height)
    pdf.ln(line_height)

    pdf.set_font("Times", size=15)
    pdf.cell(col_width*4, line_height, "Patient Scan")
    pdf.ln(line_height)
    
    pdf.output('table_with_cells.pdf')

generate_report(prediction, 'x.pdf')