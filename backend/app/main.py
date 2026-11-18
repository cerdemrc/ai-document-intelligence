from fastapi import FastAPI
from app.api.documents import router as documents_router

app = FastAPI(
    title="AI Document Intelligence",
    description="An AI-powered document analysis API",
    version="0.1.0"
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(
    documents_router,
    prefix="/api/documents",
    tags=["Documents"]
)