import React, { useState } from 'react';
import { UploadCloud, Scan, Globe, GitCommit, ShieldCheck, Camera, CheckCircle2, UserCheck } from 'lucide-react';
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
    <section id="ingestion-section" className="max-w-7xl mx-auto px-6 mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Hero Photo Card (22px radius, Soft Stone #eeece7) */}
        <div className="lg:col-span-7 bg-soft-stone rounded-lg p-6 sm:p-8 border border-card-border flex flex-col justify-between relative shadow-sm">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="mono-tag text-xs text-slate">STEP 01 // INGESTION</span>
                <h3 className="text-2xl font-display font-medium text-ink mt-1">Authorized Portrait Stream</h3>
                <p className="text-xs text-slate mt-0.5">Select a verified subject or upload custom imagery with single/multi-person detection</p>
              </div>
              <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-mono text-deep-green border border-border-light shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>InsightFace Multi-Target</span>
              </span>
            </div>

            {/* Verified Preset Selector (Coral & Outline Chips) */}
            <div className="mb-5">
              <span className="text-[11px] mono-tag text-slate block mb-2">VERIFIED CONSENTED SUBJECTS / PRESETS:</span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_PORTRAITS.map((p) => {
                  const isSelected = selectedPortrait?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onSelectPortrait(p)}
                      className={`px-3 py-1.5 rounded-pill text-xs font-medium transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white border border-hairline text-ink hover:bg-hairline/40'
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5 text-coral" />
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Multi-Person Face Selector Bar (When 2+ faces in image) */}
            {detectedFaces && detectedFaces.length > 1 && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-semibold text-emerald-900 flex items-center gap-1.5">
                    <Scan className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{detectedFaces.length} DISTINCT PERSONS DETECTED IN IMAGE — SELECT TARGET:</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {detectedFaces.map((f, idx) => {
                    const isSelected = selectedFaceIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => onSelectFaceIndex && onSelectFaceIndex(idx)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-2 border ${
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-white text-ink border-emerald-300 hover:bg-emerald-100/50'
                        }`}
                      >
                        {f.thumbnail && (
                          <img src={f.thumbnail} alt={f.label} className="w-5 h-5 rounded-full object-cover border border-coral" />
                        )}
                        <span>{f.label || `Person #${idx + 1}`}</span>
                        <span className={`text-[10px] font-mono ${isSelected ? 'text-emerald-300' : 'text-slate'}`}>
                          ({((f.confidence || 0.98) * 100).toFixed(0)}%)
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Active Reference Display with Bounding Box Overlay */}
            <div className="bg-white rounded-md p-5 border border-hairline relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                
                {/* Visual Media with Bounding Box */}
                <div className="sm:col-span-5 relative group rounded-sm overflow-hidden bg-primary/5 aspect-square border border-border-light">
                  <img
                    src={selectedPortrait?.url}
                    alt={selectedPortrait?.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Render Bounding Boxes for detected faces */}
                  {detectedFaces && detectedFaces.length > 1 ? (
                    detectedFaces.map((f, idx) => {
                      const isSelected = selectedFaceIndex === idx;
                      return (
                        <div
                          key={idx}
                          className={`absolute border-2 rounded-xs pointer-events-none transition-all ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-500/15 ring-2 ring-emerald-400 z-10'
                              : 'border-coral/60 bg-coral/5 z-0'
                          }`}
                          style={{
                            left: `${idx === 0 ? 15 : 55}%`,
                            top: '15%',
                            width: '35%',
                            height: '55%'
                          }}
                        >
                          <span className={`absolute -top-3 left-1 font-mono text-[9px] px-1.5 py-0.2 rounded shadow-xs text-white ${
                            isSelected ? 'bg-emerald-600' : 'bg-coral'
                          }`}>
                            {f.label || `Person #${idx + 1}`}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    /* Single Face Bounding Box */
                    <div className="absolute inset-4 border-2 border-emerald-500 bg-emerald-500/10 rounded-xs pointer-events-none transition-all">
                      <span className="absolute -top-3 left-2 bg-emerald-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow-xs">
                        FACE DETECTED {((selectedPortrait?.confidence || 0.985) * 100).toFixed(1)}%
                      </span>
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
                    </div>
                  )}
                </div>

                {/* Metadata Column */}
                <div className="sm:col-span-7 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-pale-green text-deep-green font-mono text-[11px] rounded-full font-medium">
                      ACTIVE REFERENCE
                    </span>
                    <span className="text-xs text-slate font-mono">
                      ID: {selectedPortrait?.id} {detectedFaces && detectedFaces.length > 1 ? `[Target #${selectedFaceIndex + 1}]` : ''}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] mono-tag text-slate block font-semibold">TARGET SUBJECT / SEARCH QUERY:</label>
                    <input
                      type="text"
                      value={selectedPortrait?.name || ''}
                      onChange={(e) => onUpdateSubjectName && onUpdateSubjectName(e.target.value)}
                      placeholder="Enter person name (e.g. Samantha Ruth Prabhu, Disha Patani)..."
                      className="w-full bg-soft-stone border border-border-light rounded px-3 py-1.5 text-sm font-display font-medium text-ink focus:outline-none focus:border-coral"
                    />
                  </div>
                  <p className="text-xs text-slate">{selectedPortrait?.role} • {selectedPortrait?.organization}</p>

                  <div className="pt-2 border-t border-hairline space-y-1 text-xs font-mono text-slate">
                    <div className="flex justify-between">
                      <span>Detection Confidence:</span>
                      <strong className="text-deep-green">{((activeFace?.confidence || selectedPortrait?.confidence || 0.985) * 100).toFixed(1)}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>ArcFace Embedding:</span>
                      <strong className="text-ink">512-dim Float32</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Capture Metadata:</span>
                      <span className="text-slate truncate max-w-[150px]">{selectedPortrait?.camera}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional File Upload Dropzone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`mt-4 border-2 border-dashed rounded-md p-4 text-center transition-all cursor-pointer ${
                dragOver ? 'border-coral bg-coral/5' : 'border-hairline hover:border-slate bg-white/60'
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
              <label htmlFor="custom-file-input" className="cursor-pointer flex items-center justify-center gap-2 text-xs font-medium text-ink">
                <UploadCloud className="w-4 h-4 text-slate" />
                <span>Or upload custom authorized portrait file (JPG, PNG, WEBP)</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate mono-tag mt-6 pt-4 border-t border-hairline">
            <span>Transient In-Memory Embedding</span>
            <span>Zero Persistent Database Storage</span>
          </div>
        </div>

        {/* Right: Agent Command Console Card (22px radius, #17171c Primary) */}
        <div className="lg:col-span-5 bg-primary text-white rounded-lg p-6 sm:p-8 border border-primary flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-xs font-medium tracking-wider text-muted">AGENT COMMAND CONSOLE</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                EVM LOCAL ACTIVE
              </span>
            </div>

            {/* Agent Pipeline Task Breakdown */}
            <div className="space-y-3 font-mono text-xs">
              
              {/* Agent 1 */}
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-sm border border-white/5 hover:border-white/15 transition-all">
                <div className="flex items-center gap-2.5">
                  <Scan className="w-4 h-4 text-coral" />
                  <div>
                    <div className="text-neutral-200 font-medium">FaceEncodingAgent</div>
                    <div className="text-[10px] text-muted">InsightFace buffalo_l 512-d</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-semibold">{agentStatus.faceEncoding}</span>
              </div>

              {/* Agent 2 */}
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-sm border border-white/5 hover:border-white/15 transition-all">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-sky-400" />
                  <div>
                    <div className="text-neutral-200 font-medium">PublicDiscoveryAgent</div>
                    <div className="text-[10px] text-muted">DuckDuckGo Search & Media Index</div>
                  </div>
                </div>
                <span className={`font-semibold ${agentStatus.discovery === 'SEARCHING...' ? 'text-amber-400 animate-pulse' : 'text-neutral-300'}`}>
                  {agentStatus.discovery}
                </span>
              </div>

              {/* Agent 3 */}
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-sm border border-white/5 hover:border-white/15 transition-all">
                <div className="flex items-center gap-2.5">
                  <GitCommit className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-neutral-200 font-medium">SimilarityVerifier</div>
                    <div className="text-[10px] text-muted">Cosine Vector Distance & FFmpeg</div>
                  </div>
                </div>
                <span className={`font-semibold ${agentStatus.similarity === 'MATCHING...' ? 'text-amber-400 animate-pulse' : 'text-neutral-300'}`}>
                  {agentStatus.similarity}
                </span>
              </div>

              {/* Agent 4 */}
              <div className="flex items-center justify-between bg-white/5 p-3 rounded-sm border border-white/5 hover:border-white/15 transition-all">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-neutral-200 font-medium">BlockchainAnchorAgent</div>
                    <div className="text-[10px] text-muted">EvidenceRegistry.sol Local EVM</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-semibold">{agentStatus.blockchain}</span>
              </div>
            </div>
          </div>

          {/* Dynamic Console Stream Log */}
          <div className="mt-8 pt-4 border-t border-white/10 font-mono text-[11px]">
            <div className="flex justify-between items-center text-neutral-500 mb-2">
              <span>// Live Telemetry Log</span>
              <span className="text-[10px] text-neutral-600">RPC 127.0.0.1:8545</span>
            </div>
            <div className="bg-black/40 p-3 rounded font-mono text-emerald-300/90 border border-white/5 min-h-[54px] flex items-center">
              <span>&gt; {consoleLog}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
