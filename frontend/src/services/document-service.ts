import type { DocumentResponse } from "@/types/document";

const API_URL = "http://localhost:8000";

export async function analyzeDocument(file: File): Promise<DocumentResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/api/documents/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Document analysis failed.");
  }

  return response.json();
}
