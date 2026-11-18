from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.pdf_service import extract_text_from_pdf

router = APIRouter()

@router.post("/analyze")
async def analyze_document(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported."
        )

    file_bytes = await file.read()

    extracted_text = extract_text_from_pdf(file_bytes)

    return {
        "filename": file.filename,
        "text": extracted_text
    }