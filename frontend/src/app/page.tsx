"use client";

import { useState } from "react";
import FileUpload from "@/components/upload/file-upload";
import type { DocumentResponse } from "@/types/document";

export default function Home() {
  const [document, setDocument] = useState<DocumentResponse | null>(null);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            AI Document Intelligence
          </h1>

          <p className="mt-2 text-gray-600">
            Upload your PDF and extract meaningful insights with AI.
          </p>
        </header>

        <FileUpload onAnalysisComplete={setDocument} />

        {document && (
          <section className="mt-10 rounded-xl border bg-white p-6">
            <h2 className="text-xl font-semibold">Document Analysis</h2>

            <p className="mt-4 text-gray-700">{document.analysis.summary}</p>
          </section>
        )}
      </div>
    </main>
  );
}
