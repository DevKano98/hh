import React, { useState, useEffect } from 'react';
import { ShieldAlert, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

export default function TamperPlayground({ evidenceData, evidenceHash, onVerifyOnChain }) {
  const [tamperedScore, setTamperedScore] = useState(99.9);
  const [tamperedSource, setTamperedSource] = useState('Altered Foreign Index');
  const [alteredHash, setAlteredHash] = useState('');

  useEffect(() => {
    if (evidenceData) {
      setTamperedScore(parseFloat(evidenceData.similarity_score) + 4.2);
    }
  }, [evidenceData]);

  // Recalculate SHA-256 for altered data in real-time
  useEffect(() => {
    async function updateHash() {
      if (!evidenceData) return;
      const alteredObj = {
        ...evidenceData,
        similarity_score: parseFloat(tamperedScore) || 99.9,
        source: tamperedSource
      };
      const canonical = JSON.stringify(alteredObj);
      const encoder = new TextEncoder();
      const data = encoder.encode(canonical);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setAlteredHash(hashHex);
    }
    updateHash();
  }, [tamperedScore, tamperedSource, evidenceData]);

  const origHashDisplay = evidenceHash || '8f91c4d8c729482b0129a8f2381270912384a9f8120394812304918239048123';
  const displayAlteredHash = alteredHash || 'a712b84298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852c921';

  return (
    <section id="tamper-section" className="bg-soft-stone py-16 border-y border-hairline">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="mono-tag text-xs text-coral">SECURITY EXPERIMENTATION</span>
          <h2 className="text-3xl sm:text-5xl font-display font-normal tracking-tight mt-2 text-ink">
            Cryptographic integrity & tamper demonstration.
          </h2>
          <p className="text-slate mt-3 text-base leading-relaxed">
            Test the zero-tolerance mathematical security of blockchain provenance. Modify any field in the evidence package to watch the SHA-256 fingerprint diverge, triggering an immediate on-chain validation failure.
          </p>
        </div>

        {/* Playground Container */}
        <div className="bg-white rounded-lg p-6 sm:p-8 border border-border-light shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left: Original Record */}
            <div className="border border-emerald-300 bg-emerald-50/50 rounded-md p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-700 text-white font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ORIGINAL CANONICAL RECORD</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-800 font-bold">ON-CHAIN VALID ✓</span>
                </div>

                <p className="text-xs text-slate mb-2">Immutable registered metadata fields:</p>
                <div className="space-y-1.5 font-mono text-xs bg-white p-3.5 rounded border border-emerald-200 text-ink shadow-2xs">
                  <div><strong>similarity_score:</strong> {evidenceData ? `${evidenceData.similarity_score}%` : '97.4%'}</div>
                  <div><strong>source:</strong> "{evidenceData ? evidenceData.source : 'Reuters Public Web Index'}"</div>
                  <div><strong>discovery_timestamp:</strong> "{evidenceData ? evidenceData.discovery_timestamp : '2026-09-04T18:30:10Z'}"</div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-emerald-200">
                <span className="text-[11px] mono-tag text-slate">Original Digest</span>
                <div className="font-mono text-xs text-emerald-900 break-all mt-1 font-semibold">
                  {origHashDisplay}
                </div>
              </div>
            </div>

            {/* Right: Altered Metadata Column */}
            <div className="border border-red-300 bg-red-50/50 rounded-md p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-red-600 text-white font-semibold flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>ALTERED METADATA COPY</span>
                  </span>
                  <span className="text-xs font-mono text-red-700 font-bold">TAMPER DETECTED ✗</span>
                </div>

                <p className="text-xs text-slate mb-2">Interactive field editor (modify to test hash):</p>
                <div className="space-y-2.5 font-mono text-xs bg-white p-3.5 rounded border border-red-200 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="text-slate">similarity_score:</label>
                    <input
                      type="number"
                      value={tamperedScore}
                      step="0.1"
                      onChange={(e) => setTamperedScore(e.target.value)}
                      className="border border-red-300 rounded px-2 py-0.5 w-28 text-xs font-mono text-ink bg-red-50/30 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-slate">source:</label>
                    <input
                      type="text"
                      value={tamperedSource}
                      onChange={(e) => setTamperedSource(e.target.value)}
                      className="border border-red-300 rounded px-2 py-0.5 w-44 text-xs font-mono text-ink bg-red-50/30 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-red-200">
                <span className="text-[11px] mono-tag text-slate">Divergent Altered Digest</span>
                <div className="font-mono text-xs text-red-700 break-all mt-1 font-semibold">
                  {displayAlteredHash}
                </div>
              </div>
            </div>

          </div>

          {/* Action Bar */}
          <div className="mt-8 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-sm font-medium text-ink">Zero-Tolerance Cryptographic Integrity Check</span>
            </div>

            <button
              onClick={onVerifyOnChain}
              className="bg-primary hover:bg-cohere-black text-white px-6 py-2.5 rounded-pill text-xs font-medium transition-all flex items-center gap-2 shadow-sm active:scale-95"
            >
              <ShieldAlert className="w-4 h-4 text-coral" />
              <span>Execute On-Chain Verification</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
