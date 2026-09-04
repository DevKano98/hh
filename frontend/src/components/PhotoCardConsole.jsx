import React, { useState } from 'react';
import { UploadCloud, Scan, Globe, GitCommit, ShieldCheck, Camera, CheckCircle2, UserCheck, Terminal, Cpu } from 'lucide-react';
import { SAMPLE_PORTRAITS } from '../data/mockData';

export default function PhotoCardConsole({
  selectedPortrait,
  onSelectPortrait,
  onCustomUpload,
  onUpdateSubjectName,
  detectedFaces = [],
  selectedFaceIndex = 0,
  onSelectFaceIndex,
  agentStatus,
  consoleLog
}) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onCustomUpload(e.dataTransfer.files[0]);
    }
  };

  const activeFace = detectedFaces && detectedFaces.length > 0 ? detectedFaces[selectedFaceIndex] || detectedFaces[0] : null;

  return (
    <section id="ingestion-section" className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Authorized Portrait Stream Card */}
        <div className="lg:col-span-7 bg-white rounded-xl p-5 sm:p-6 border border-zinc-200 shadow-card flex flex-col justify-between">
          <div>
            {/* Title & Badge */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[11px] font-mono font-medium">INGESTION 01</span>
                  <h3 className="text-lg font-semibold text-zinc-900">Authorized Reference Stream</h3>
                </div>
                <p className="text-xs text-zinc-500 mt-1">Select consented subject or ingest custom media for biometric facial extraction</p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-mono font-medium rounded-md border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>InsightFace 512-D</span>
              </span>
            </div>

            {/* Consented Subject Presets */}
            <div className="mb-4">
              <span className="text-[11px] font-mono text-zinc-400 block mb-1.5">VERIFIED REFERENCE SUBJECTS:</span>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_PORTRAITS.map((p) => {
                  const isSelected = selectedPortrait?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onSelectPortrait(p)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                          : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                      }`}
                    >
                      <UserCheck className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-zinc-400'}`} />
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Multi-Person Face Selector Bar */}
            {detectedFaces && detectedFaces.length > 1 && (
              <div className="mb-4 p-3 bg-zinc-50 border border-zinc-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-semibold text-zinc-900 flex items-center gap-1.5">
                    <Scan className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{detectedFaces.length} DETECTED PERSONS IN FRAME — SELECT TARGET:</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {detectedFaces.map((f, idx) => {
                    const isSelected = selectedFaceIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => onSelectFaceIndex && onSelectFaceIndex(idx)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-2 border ${
                          isSelected
                            ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                        }`}
                      >
                        {f.thumbnail && (
                          <img src={f.thumbnail} alt={f.label} className="w-4 h-4 rounded-full object-cover border border-emerald-500" />
                        )}
                        <span>{f.label || `Person #${idx + 1}`}</span>
                        <span className={`text-[10px] font-mono ${isSelected ? 'text-emerald-300' : 'text-zinc-400'}`}>
                          {((f.confidence || 0.98) * 100).toFixed(0)}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Active Reference Display */}
            <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-200/80 relative">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                
                {/* Visual Media with Bounding Box Overlay */}
                <div className="sm:col-span-5 relative group rounded-md overflow-hidden bg-zinc-900 aspect-square border border-zinc-200">
                  <img
                    src={selectedPortrait?.url}
                    alt={selectedPortrait?.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Render Bounding Boxes */}
                  {detectedFaces && detectedFaces.length > 1 ? (
                    detectedFaces.map((f, idx) => {
                      const isSelected = selectedFaceIndex === idx;
                      const [x, y, w, h] = f.bbox_pct || [10 + idx * 45, 15, 38, 50];
                      return (
                        <div
                          key={idx}
                          className={`absolute border-2 rounded-xs pointer-events-none transition-all ${
                            isSelected
                              ? 'border-emerald-400 bg-emerald-500/15 shadow-sm z-10'
                              : 'border-zinc-400/60 bg-black/20 z-0'
                          }`}
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: `${w}%`,
                            height: `${h}%`
                          }}
                        >
                          <span className={`absolute -top-3 left-1 font-mono text-[9px] px-1 py-0.2 rounded shadow-xs text-white ${
                            isSelected ? 'bg-emerald-600' : 'bg-zinc-700'
                          }`}>
                            {f.label || `Person #${idx + 1}`}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="absolute border-2 border-emerald-400 bg-emerald-500/10 rounded-xs pointer-events-none transition-all"
                      style={
                        selectedPortrait?.bbox_pct
                          ? {
                              left: `${selectedPortrait.bbox_pct[0]}%`,
                              top: `${selectedPortrait.bbox_pct[1]}%`,
                              width: `${selectedPortrait.bbox_pct[2]}%`,
                              height: `${selectedPortrait.bbox_pct[3]}%`
                            }
                          : { inset: '1rem' }
                      }
                    >
                      <span className="absolute -top-3 left-1 bg-emerald-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow-xs">
                        VERIFIED {((selectedPortrait?.confidence || 0.985) * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Metadata Column */}
                <div className="sm:col-span-7 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono text-[10px] rounded font-medium">
                      ACTIVE TARGET
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">
                      ID: {selectedPortrait?.id}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-500 block font-medium">TARGET SUBJECT NAME:</label>
                    <input
                      type="text"
                      value={selectedPortrait?.name || ''}
                      onChange={(e) => onUpdateSubjectName && onUpdateSubjectName(e.target.value)}
                      placeholder="Enter subject name..."
                      className="w-full bg-white border border-zinc-200 rounded-md px-3 py-1.5 text-xs font-medium text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900"
                    />
                  </div>
                  <p className="text-xs text-zinc-500">{selectedPortrait?.role} • {selectedPortrait?.organization}</p>

                  <div className="pt-2 border-t border-zinc-200 space-y-1 text-xs font-mono text-zinc-600">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Confidence:</span>
                      <strong className="text-emerald-700">{((activeFace?.confidence || selectedPortrait?.confidence || 0.985) * 100).toFixed(1)}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Vector Format:</span>
                      <strong className="text-zinc-800">512-dim Float32</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Sensor Stream:</span>
                      <span className="text-zinc-600 truncate max-w-[140px]">{selectedPortrait?.camera || 'UHD Reference Stream'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Drag & Drop Upload Strip */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`mt-3 border border-dashed rounded-lg p-3 text-center transition-all cursor-pointer ${
                dragOver ? 'border-zinc-900 bg-zinc-100' : 'border-zinc-300 hover:border-zinc-400 bg-white'
              }`}
            >
              <input
                type="file"
                id="custom-file-input"
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    onCustomUpload(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="custom-file-input" className="cursor-pointer flex items-center justify-center gap-2 text-xs font-medium text-zinc-700">
                <UploadCloud className="w-4 h-4 text-zinc-400" />
                <span>Drag image or click to upload custom authorized portrait (JPG, PNG, WEBP)</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono mt-4 pt-3 border-t border-zinc-100">
            <span>Transient Biometric Buffer</span>
            <span>Zero Persistent Face Storage</span>
          </div>
        </div>

        {/* Right: Agent Command & Telemetry Console */}
        <div className="lg:col-span-5 bg-zinc-950 text-white rounded-xl p-5 sm:p-6 border border-zinc-800 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-xs font-medium text-zinc-300">TELEMETRY AGENT CONSOLE</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                RPC ACTIVE
              </span>
            </div>

            {/* Agent Services List */}
            <div className="space-y-2 font-mono text-xs">
              
              <div className="flex items-center justify-between bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <Scan className="w-3.5 h-3.5 text-zinc-400" />
                  <div>
                    <div className="text-zinc-200 text-xs font-medium">FaceEncodingAgent</div>
                    <div className="text-[10px] text-zinc-500">InsightFace 512-d ArcFace</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-semibold text-xs">{agentStatus.faceEncoding}</span>
              </div>

              <div className="flex items-center justify-between bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <div>
                    <div className="text-zinc-200 text-xs font-medium">LiveScraperAgent</div>
                    <div className="text-[10px] text-zinc-500">Wikipedia & Commons Global Wire</div>
                  </div>
                </div>
                <span className={`text-xs font-semibold ${agentStatus.discovery === 'SEARCHING...' ? 'text-amber-400 animate-pulse' : 'text-zinc-300'}`}>
                  {agentStatus.discovery}
                </span>
              </div>

              <div className="flex items-center justify-between bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <GitCommit className="w-3.5 h-3.5 text-amber-400" />
                  <div>
                    <div className="text-zinc-200 text-xs font-medium">SimilarityVerifier</div>
                    <div className="text-[10px] text-zinc-500">512-D Cosine Vector Metric</div>
                  </div>
                </div>
                <span className={`text-xs font-semibold ${agentStatus.similarity === 'MATCHING...' ? 'text-amber-400 animate-pulse' : 'text-zinc-300'}`}>
                  {agentStatus.similarity}
                </span>
              </div>

              <div className="flex items-center justify-between bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <div>
                    <div className="text-zinc-200 text-xs font-medium">BlockchainAnchorAgent</div>
                    <div className="text-[10px] text-zinc-500">EvidenceRegistry.sol EVM Node</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-semibold text-xs">{agentStatus.blockchain}</span>
              </div>

            </div>
          </div>

          {/* Live Log Stream */}
          <div className="mt-4 pt-3 border-t border-zinc-800 font-mono text-[11px]">
            <div className="flex justify-between items-center text-zinc-500 mb-1.5">
              <span>// Live Execution Stream</span>
              <span className="text-[10px] text-zinc-600">Port 8000</span>
            </div>
            <div className="bg-zinc-900 p-2.5 rounded-md font-mono text-emerald-300 text-xs border border-zinc-800/80 min-h-[44px] flex items-center">
              <span>&gt; {consoleLog}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

