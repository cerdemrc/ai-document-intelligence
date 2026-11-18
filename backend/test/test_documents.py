import pymupdf
import pytest

from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def sample_pdf():
    document = pymupdf.open()

    page = document.new_page()
    page.insert_text((72, 72), "This is a sample PDF document.")

    pdf_bytes = document.tobytes()
    document.close()

    return pdf_bytes

def test_upload_valid_pdf(client, sample_pdf):
    response = client.post(
        "/api/documents/analyze",
        files={
            "file": (
                "sample.pdf",
                sample_pdf,
                "application/pdf"
            )
        }
    )

    assert response.status_code == 200
    assert "This is a sample PDF document." in response.json()["text"]


def test_reject_non_pdf_file(client):
    response = client.post(
        "/api/documents/analyze",
        files={
            "file": (
                "sample.txt",
                b"This is a text file.",
                "text/plain"
            )
        }
    )

    assert response.status_code == 415


def test_reject_empty_file(client):
    response = client.post(
        "/api/documents/analyze",
        files={
            "file": (
                "empty.pdf",
                b"",
                "application/pdf"
            )
        }
    )

    assert response.status_code == 400


def test_reject_invalid_pdf(client):
    response = client.post(
        "/api/documents/analyze",
        files={
            "file": (
                "invalid.pdf",
                b"This is not a PDF.",
                "application/pdf"
            )
        }
    )

    assert response.status_code == 400


def test_reject_pdf_without_text(client):
    document = pymupdf.open()
    document.new_page()
    pdf_bytes = document.tobytes()
    document.close()

    response = client.post(
        "/api/documents/analyze",
        files={
            "file": (
                "empty-content.pdf",
                pdf_bytes,
                "application/pdf"
            )
        }
    )

    assert response.status_code == 422