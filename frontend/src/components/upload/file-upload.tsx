"use client";

import { useState } from "react";
import { analyzeDocument } from "@/services/document-service";
import type { DocumentResponse } from "@/types/document";

type FileUploadProps = {
  onAnalysisComplete: (result: DocumentResponse) => void;
};

export default function FileUpload({ onAnalysisComplete }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError(null);

    if (file.type !== "application/pdf") {
      setSelectedFile(null);
      setError("Please select a PDF file.");
      return;
    }

    setSelectedFile(file);
  }

  async function handleUpload() {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeDocument(selectedFile);
      onAnalysisComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl rounded-xl border border-gray-200 p-6">
      <h2 className="mb-4 text-xl font-semibold">Upload your document</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={isLoading}
        className="mb-4 block w-full text-sm"
      />

      {selectedFile && (
        <p className="mb-4 text-sm text-gray-600">
          Selected: {selectedFile.name}
        </p>
      )}

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || isLoading}
        className="rounded-lg bg-black px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Analyzing..." : "Analyze document"}
      </button>
    </div>
  );
}
