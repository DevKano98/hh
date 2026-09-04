import React, { useState, useEffect } from 'react';
import { ShieldAlert, RefreshCw, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

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
    <section id="tamper-section" className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-zinc-200 shadow-card">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-100 pb-4 mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[11px] font-mono font-medium">SECURITY 08</span>
              <h3 className="text-lg font-semibold text-zinc-900">Cryptographic Tamper Simulation Playground</h3>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">Modify any metadata field to observe instantaneous SHA-256 divergence and on-chain verification failure</p>
          </div>

          <button
            onClick={onVerifyOnChain}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950 text-white text-xs font-medium hover:bg-zinc-800 transition-all shadow-xs"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Run Cryptographic Verification</span>
          </button>
        </div>

        {/* Playground Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Left: Original Record */}
          <div className="border border-emerald-200 bg-emerald-50/40 rounded-lg p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-700 text-white font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>ORIGINAL RECORD</span>
                </span>
                <span className="text-xs font-mono text-emerald-800 font-semibold">ON-CHAIN VALID ✓</span>
              </div>

              <div className="space-y-1.5 font-mono text-xs bg-white p-3 rounded-md border border-emerald-200 text-zinc-800 shadow-2xs">
                <div><span className="text-zinc-400">similarity_score:</span> <strong>{evidenceData ? `${evidenceData.similarity_score}%` : '97.4%'}</strong></div>
                <div><span className="text-zinc-400">source:</span> <strong>"{evidenceData ? evidenceData.source : 'Wikipedia Verified'}"</strong></div>
                <div><span className="text-zinc-400">timestamp:</span> <span className="text-zinc-600 font-mono text-[11px]">{evidenceData ? evidenceData.discovery_timestamp : '2026-09-04T18:30:10Z'}</span></div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-200">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">CANONICAL SHA-256 HASH</span>
              <div className="font-mono text-xs text-emerald-900 break-all mt-0.5 font-semibold">
                {origHashDisplay}
              </div>
            </div>
          </div>

          {/* Right: Altered Metadata Column */}
          <div className="border border-red-200 bg-red-50/40 rounded-lg p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-red-600 text-white font-medium flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  <span>ALTERED MUTATION</span>
                </span>
                <span className="text-xs font-mono text-red-700 font-semibold">MISMATCH DETECTED ✗</span>
              </div>

              <div className="space-y-2 font-mono text-xs bg-white p-3 rounded-md border border-red-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <label className="text-zinc-500">similarity_score:</label>
                  <input
                    type="number"
                    value={tamperedScore}
                    step="0.1"
                    onChange={(e) => setTamperedScore(e.target.value)}
                    className="border border-red-200 rounded px-2 py-0.5 w-24 text-xs font-mono text-zinc-900 bg-red-50/30 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-zinc-500">source:</label>
                  <input
                    type="text"
                    value={tamperedSource}
                    onChange={(e) => setTamperedSource(e.target.value)}
                    className="border border-red-200 rounded px-2 py-0.5 w-40 text-xs font-mono text-zinc-900 bg-red-50/30 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-red-200">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">DIVERGENT ALTERED HASH</span>
              <div className="font-mono text-xs text-red-700 break-all mt-0.5 font-semibold">
                {displayAlteredHash}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

