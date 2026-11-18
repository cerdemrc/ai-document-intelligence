import pymupdf

def extract_text_from_pdf(file_bytes: bytes) -> str:
    document = pymupdf.open(stream=file_bytes, filetype="pdf")

    extracted_text = []

    for page in document:
        page_text = page.get_text()
        extracted_text.append(page_text)

    document.close()

    return "\n".join(extracted_text)