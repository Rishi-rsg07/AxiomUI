'use client';

import { useState } from 'react';
import AuditForm from '@/components/AuditForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import DiffSlider from '@/components/DiffSlider';

export default function Home() {
  const [auditData, setAuditData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuditSubmit = async (base64Image: string) => {
    setLoading(true);
    setAuditData(null);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
      });
      const data = await res.json();
      setAuditData(data);
    } catch (err) {
      console.error("Audit processing failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Block */}
        <header className="border-b border-slate-800 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            HCI Heuristic Auditor
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Upload UI blueprints to instantly audit layouts against core Human-Computer Interaction frameworks.
          </p>
        </header>

        {/* Action Split Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-200">System Input Pipeline</h2>
            <AuditForm onUpload={handleAuditSubmit} isLoading={loading} />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-200">Interactive Visual Proof</h2>
            <DiffSlider />
          </div>
        </div>

        {/* Dynamic Analysis Reporting Outputs */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 border border-dashed border-slate-700 rounded-xl bg-slate-800/30">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-400"></div>
            <p className="text-sm text-slate-400 font-mono">Running structural models against interaction design axioms...</p>
          </div>
        )}

        {auditData && <ResultsDisplay data={auditData} />}
      </div>
    </main>
  );
}