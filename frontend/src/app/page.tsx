"use client";

import { useState } from "react";
import FileUpload from "@/components/upload/file-upload";
import type { DocumentResponse } from "@/types/document";

export default function Home() {
  const [document, setDocument] = useState<DocumentResponse | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold tracking-wide text-indigo-600">
              AI WORKSPACE
            </p>
            <h1 className="mt-1 text-xl font-bold tracking-tight">
              Document Intelligence
            </h1>
          </div>

          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Local AI · Ollama
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Analyze your documents
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Upload a PDF and let AI extract meaningful insights from it.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          <aside>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-1 font-semibold">Upload document</h3>
              <p className="mb-5 text-sm text-slate-500">
                Select a PDF file to get started.
              </p>

              <FileUpload
                onAnalysisComplete={setDocument}
                onClear={() => setDocument(null)}
              />
            </div>
          </aside>

          <section className="min-w-0">
            {!document ? (
              <div className="flex min-h-90 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                  📄
                </div>
                <h3 className="font-semibold">No document analyzed yet</h3>
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                  Your document insights will appear here after you upload and
                  analyze a PDF.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    Analysis result
                  </p>
                  <h3 className="mt-2 text-lg font-bold">
                    {document.filename}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-600">
                    {document.analysis.summary}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <ResultCard
                    title="Key Points"
                    count={document.analysis.key_points.length}
                  >
                    {document.analysis.key_points.length > 0 ? (
                      <ul className="space-y-3">
                        {document.analysis.key_points.map((point, index) => (
                          <li
                            key={index}
                            className="flex gap-3 text-sm leading-6 text-slate-600"
                          >
                            <span className="font-semibold text-indigo-600">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <EmptyMessage />
                    )}
                  </ResultCard>

                  <ResultCard
                    title="Action Items"
                    count={document.analysis.action_items.length}
                  >
                    {document.analysis.action_items.length > 0 ? (
                      <div className="space-y-4">
                        {document.analysis.action_items.map((item, index) => (
                          <div
                            key={index}
                            className="rounded-xl bg-slate-50 p-4"
                          >
                            <p className="text-sm font-medium text-slate-800">
                              {item.task}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                              <span>
                                Responsible:{" "}
                                {item.responsible_person ?? "Not specified"}
                              </span>
                              <span>
                                Deadline: {item.deadline ?? "Not specified"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyMessage />
                    )}
                  </ResultCard>

                  <ResultCard
                    title="Decisions"
                    count={document.analysis.decisions.length}
                  >
                    {document.analysis.decisions.length > 0 ? (
                      <ul className="list-inside list-disc space-y-2 text-sm leading-6 text-slate-600">
                        {document.analysis.decisions.map((decision, index) => (
                          <li key={index}>{decision}</li>
                        ))}
                      </ul>
                    ) : (
                      <EmptyMessage />
                    )}
                  </ResultCard>

                  <ResultCard title="Document Info">
                    <p className="text-sm text-slate-600">
                      Extracted pages: {document.pages.length}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      Extracted characters:{" "}
                      {document.text.length.toLocaleString()}
                    </p>
                  </ResultCard>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function ResultCard({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        {count !== undefined && (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {count}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function EmptyMessage() {
  return (
    <p className="text-sm text-slate-400">
      No information found in the document.
    </p>
  );
}
