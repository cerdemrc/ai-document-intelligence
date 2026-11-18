import pymupdf

def extract_text_from_pdf(file_bytes: bytes) -> list[dict]:
    if b"%PDF-" not in file_bytes[:1024]:
        raise ValueError("Invalid PDF file.")

    try:
        document = pymupdf.open(
            stream=file_bytes,
            filetype="pdf"
        )
    except pymupdf.FileDataError:
        raise ValueError("The PDF file is corrupted or invalid.")

    extracted_pages = []

    try:
        for page_number, page in enumerate(document.pages(), start=1):
            page_text = page.get_text()

            extracted_pages.append({
                "page_number": page_number,
                "text": page_text
            })
    finally:
        document.close()

    return extracted_pages