# AI Document Intelligence

An AI-powered PDF analysis application that extracts meaningful insights from documents using a locally hosted Large Language Model (LLM).

Upload a PDF and automatically generate a summary, identify key points, extract action items, and detect explicitly stated decisions.

## Features

- **PDF Upload:** Upload PDF documents through a simple web interface.
- **Text Extraction:** Extract text from PDF files using PyMuPDF.
- **AI-Powered Analysis:** Analyze document content using Qwen 2.5 7B through Ollama.
- **Structured Output:** Generate structured analysis results using Pydantic models.
- **Document Summary:** Generate concise summaries of uploaded documents.
- **Key Points:** Identify the most important information.
- **Action Items:** Extract tasks, responsible persons, and deadlines when explicitly specified.
- **Decision Extraction:** Identify decisions explicitly stated in the document.
- **Local LLM Execution:** Run AI analysis locally without requiring an external LLM API key.

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Python
- FastAPI
- PyMuPDF
- Pydantic
- HTTPX
- Pytest

### AI / LLM
- Ollama
- Qwen 2.5 7B

## Architecture

The application follows a simple document processing pipeline:

```text
PDF Upload
    |
    v
Next.js Frontend
    |
    v
FastAPI Backend
    |
    v
PDF Text Extraction (PyMuPDF)
    |
    v
LLM Analysis (Ollama + Qwen 2.5)
    |
    v
Structured Output Validation (Pydantic)
    |
    v
Analysis Results
    |
    v
Next.js Frontend
```

## Project Structure

```text
ai-document-intelligence/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── tests/
│   └── pytest.ini
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── types/
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Python 3.12+
- Node.js 20+
- npm
- Ollama

### 1. Clone the Repository

```bash
git clone https://github.com/cerdemrc/ai-document-intelligence.git
cd ai-document-intelligence
```

### 2. Set Up Ollama

Install Ollama and pull the model:

```bash
ollama pull qwen2.5:7b
```

Make sure Ollama is running locally.

### 3. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
python -m uvicorn app.main:app --reload
```

The API will be available at:

`http://localhost:8000`

API documentation:

`http://localhost:8000/docs`

### 4. Set Up the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application:

`http://localhost:3000`

## Running Tests

Run backend tests from the `backend` directory:

```bash
python -m pytest -v
```

## Current Limitations

- Only text-based PDF documents are supported.
- Scanned PDFs requiring OCR are not currently supported.
- Long-document processing and advanced chunking strategies are not yet implemented.
- Analysis quality depends on the selected local LLM.

## Future Improvements

- Long-document processing and intelligent text chunking.
- Retrieval-Augmented Generation (RAG) for document-based question answering.
- LLM evaluation and output quality monitoring.
- Improved error handling and security.
- Docker-based deployment.
- Frontend testing.

## License

This project is currently developed for learning and portfolio purposes.
