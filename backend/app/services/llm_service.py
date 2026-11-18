import httpx

from app.schemas.analysis import DocumentAnalysis

OLLAMA_API_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "qwen2.5:7b"


async def analyze_document(document_text: str) -> DocumentAnalysis:
    prompt = f"""
    Analyze the following document.

    Extract:
    - A concise summary.
    - Important key points.
    - Action items, including responsible persons and deadlines if specified.
    - Explicitly stated decisions.

    Rules:
    - Use only information explicitly stated in the document.
    - Do not invent missing information.
    - Use null when responsible person or deadline is not specified.
    - Return empty arrays when no relevant items are found.
    -If no action items exist, return an empty array: [].
    - Never create an ActionItem with null, "null", or empty task.
    - Only include an action item when the document explicitly describes an action that needs to be performed.
    - Do not interpret general discussion topics as action items.

    Document:
    {document_text}
    """

    async with httpx.AsyncClient(timeout=180.0) as client:
        response = await client.post(
            OLLAMA_API_URL,
            json={
                "model": MODEL_NAME,
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "format": DocumentAnalysis.model_json_schema(),
                "stream": False
            }
        )

        response.raise_for_status()

        result = response.json()
        content = result["message"]["content"]

        return DocumentAnalysis.model_validate_json(content)