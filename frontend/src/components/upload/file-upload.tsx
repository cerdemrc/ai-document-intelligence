"use client";

import { useRef, useState } from "react";
import { analyzeDocument } from "@/services/document-service";
import type { DocumentResponse } from "@/types/document";

type FileUploadProps = {
  onAnalysisComplete: (result: DocumentResponse) => void;
  onClear: () => void;
};

export default function FileUpload({
  onAnalysisComplete,
  onClear,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function selectFile(file?: File) {
    if (!file) return;

    setError(null);

    if (file.type !== "application/pdf") {
      setSelectedFile(null);
      setError("Please select a PDF file.");
      return;
    }

    setSelectedFile(file);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    selectFile(event.target.files?.[0]);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  }

  async function handleUpload() {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeDocument(selectedFile);
      onAnalysisComplete(result);
      setHasAnalyzed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        disabled={isLoading}
        className="hidden"
      />

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 py-8 text-center transition-colors ${
          isDragging
            ? "border-indigo-500 bg-indigo-50"
            : "border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/50"
        }`}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V4m0 0L7 9m5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"
            />
          </svg>
        </div>

        <p
          className="max-w-full truncate px-2 font-medium text-slate-800"
          title={selectedFile?.name}
        >
          {selectedFile ? selectedFile.name : "Click to browse files"}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          {selectedFile
            ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
            : "or drag and drop your PDF here"}
        </p>

        <span className="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
          PDF · Max 10 MB
        </span>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {selectedFile && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={isLoading}
          className="mt-4 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Analyzing document..." : "Analyze document"}
        </button>
      )}

      {hasAnalyzed && (
        <button
          type="button"
          onClick={() => {
            setSelectedFile(null);
            setHasAnalyzed(false);
            setError(null);

            if (inputRef.current) {
              inputRef.current.value = "";
            }

            onClear();
          }}
          className="mt-2 w-full rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer"
        >
          Clear
        </button>
      )}
    </div>
  );
}
