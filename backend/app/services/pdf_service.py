import pymupdf

def extract_text_from_pdf(file_bytes: bytes) -> str:
    if b"%PDF-" not in file_bytes[:1024]:
        raise ValueError("Invalid PDF file.")

    try:
        document = pymupdf.open(
            stream=file_bytes,
            filetype="pdf"
        )
    except pymupdf.FileDataError:
        raise ValueError("The PDF file is corrupted or invalid.")

    extracted_text = []

    try:
        for page in document:
            page_text = page.get_text()
            extracted_text.append(page_text)
    finally:
        document.close()

    return "\n".join(extracted_text)