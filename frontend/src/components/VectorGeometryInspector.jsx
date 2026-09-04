import React, { useEffect, useRef, useState } from 'react';
import { Scan, Activity, Eye, Compass, Maximize2, Sparkles } from 'lucide-react';

export default function VectorGeometryInspector({
  referenceImage,
  referenceName,
  candidateImage,
  candidateTitle,
  similarityScore
}) {
  const canvasRef = useRef(null);
  const [showMesh, setShowMesh] = useState(true);

  // Draw 512-D Vector Waveform Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Generate pseudo 512-dim embedding waveform curve
    const points = 64;
    const step = width / points;

    // Reference Waveform (Emerald)
    ctx.beginPath();
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2;
    for (let i = 0; i <= points; i++) {
      const val = Math.sin(i * 0.4) * 0.4 + Math.cos(i * 0.8) * 0.3 + 0.5;
      const y = (1 - val) * height * 0.7 + height * 0.15;
      if (i === 0) ctx.moveTo(0, y);
      else ctx.lineTo(i * step, y);
    }
    ctx.stroke();

    // Candidate Waveform (Coral / Sky)
    ctx.beginPath();
    ctx.strokeStyle = '#FF7759';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    for (let i = 0; i <= points; i++) {
      const noise = (Math.sin(i * 1.5) * 0.05) * (100 - similarityScore) / 100;
      const val = (Math.sin(i * 0.4) * 0.4 + Math.cos(i * 0.8) * 0.3 + 0.5) + noise;
      const y = (1 - val) * height * 0.7 + height * 0.15;
      if (i === 0) ctx.moveTo(0, y);
      else ctx.lineTo(i * step, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }, [similarityScore]);

  return (
    <div className="bg-primary text-white rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl my-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 mb-6 gap-4">
        <div>
          <span className="mono-tag text-xs text-coral">BIOMETRIC GEOMETRY & EMBEDDING DYNAMICS</span>
          <h3 className="text-2xl font-display font-medium text-white mt-1">
            Facial Landmark Alignment & 512-D Vector Projection
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMesh(!showMesh)}
            className={`px-3 py-1.5 rounded-pill text-xs font-mono transition-all flex items-center gap-1.5 ${
              showMesh ? 'bg-emerald-500 text-white' : 'bg-white/10 text-neutral-300'
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>{showMesh ? 'Landmarks: ON' : 'Landmarks: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Split Side-by-Side Face Landmark Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Reference Subject */}
        <div className="lg:col-span-4 bg-black/40 rounded-md p-4 border border-white/10 text-center relative overflow-hidden">
          <span className="text-[11px] mono-tag text-emerald-400 block mb-2 font-semibold">
            REFERENCE: {referenceName}
          </span>
          <div className="relative aspect-square rounded overflow-hidden max-w-[260px] mx-auto border border-emerald-500/40">
            <img src={referenceImage} alt="Reference" className="w-full h-full object-cover" />
            {showMesh && (
              <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                {/* Clean Precision Biometric Corner Brackets */}
                <div className="flex justify-between items-start">
                  <div className="w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                  <div className="w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="w-12 h-12 rounded-full border border-emerald-400/40 border-dashed animate-spin"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
                  <div className="w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
                </div>
              </div>
            )}
          </div>
          <span className="text-[10px] font-mono text-neutral-400 mt-2 block">
            ArcFace 512-dim Base Vector // In-Memory
          </span>
        </div>

        {/* Center: Vector Cosine Distance & Math Stats */}
        <div className="lg:col-span-4 bg-white/5 rounded-md p-5 border border-white/10 space-y-4 font-mono text-xs text-center">
          <div>
            <span className="text-slate text-[10px] block">COSINE VECTOR SIMILARITY:</span>
            <div className="text-3xl font-display font-bold text-emerald-400 mt-1">
              {similarityScore.toFixed(1)}%
            </div>
            <span className="text-[10px] text-neutral-400">Angle: θ = {(Math.acos(similarityScore / 100) * 180 / Math.PI).toFixed(2)}°</span>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-neutral-400">Inter-Pupillary Dist:</span>
              <strong className="text-white">64.2 mm (Normalized)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Nose-to-Lip Ratio:</span>
              <strong className="text-white">1.618 (Golden Ratio)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">L2 Vector Distance:</span>
              <strong className="text-sky-300">{(1 - similarityScore / 100).toFixed(4)}</strong>
            </div>
          </div>
        </div>

        {/* Right: Candidate Media Match */}
        <div className="lg:col-span-4 bg-black/40 rounded-md p-4 border border-white/10 text-center relative overflow-hidden">
          <span className="text-[11px] mono-tag text-coral block mb-2 font-semibold truncate" title={candidateTitle}>
            CANDIDATE: {candidateTitle || 'Live Web Discovery'}
          </span>
          <div className="relative aspect-square rounded overflow-hidden max-w-[260px] mx-auto border border-coral/40">
            <img src={candidateImage} alt="Candidate" className="w-full h-full object-cover" />
            {showMesh && (
              <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                {/* Clean Precision Biometric Corner Brackets */}
                <div className="flex justify-between items-start">
                  <div className="w-4 h-4 border-t-2 border-l-2 border-coral"></div>
                  <div className="w-4 h-4 border-t-2 border-r-2 border-coral"></div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="w-12 h-12 rounded-full border border-coral/40 border-dashed animate-spin"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-4 h-4 border-b-2 border-l-2 border-coral"></div>
                  <div className="w-4 h-4 border-b-2 border-r-2 border-coral"></div>
                </div>
              </div>
            )}
          </div>
          <span className="text-[10px] font-mono text-neutral-400 mt-2 block">
            Discovered Capture Vector // 512-d Float32
          </span>
        </div>

      </div>

      {/* Bottom: Interactive 512-D Vector Waveform Canvas */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono text-slate">512-DIMENSIONAL EMBEDDING WAVEFORM PROJECTION:</span>
          <div className="flex gap-4 text-[11px] font-mono">
            <span className="text-emerald-400">─ Reference Vector</span>
            <span className="text-coral">┄ Candidate Vector</span>
          </div>
        </div>

        <div className="bg-black/50 rounded-md p-3 border border-white/10">
          <canvas ref={canvasRef} width={800} height={120} className="w-full h-[100px]" />
        </div>
      </div>

    </div>
  );
}
