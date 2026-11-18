from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.pdf_service import extract_text_from_pdf

router = APIRouter()

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

@router.post("/analyze")
async def analyze_document(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=415,
            detail="Only PDF files are supported."
        )

    file_bytes = await file.read(MAX_FILE_SIZE + 1)

    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File size cannot exceed 10 MB."
        )

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty."
        )

    try:
        extracted_text = extract_text_from_pdf(file_bytes)
    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    if not extracted_text.strip():
        raise HTTPException(
            status_code=422,
            detail="No extractable text found in the PDF."
        )

    return {
        "filename": file.filename,
        "text": extracted_text
    }