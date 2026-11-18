from fastapi import FastAPI
from app.api.documents import router as documents_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Document Intelligence",
    description="An AI-powered document analysis API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(
    documents_router,
    prefix="/api/documents",
    tags=["Documents"]
)