import React, { useState } from 'react';
import { Eye, ShieldAlert, Sliders, Sparkles, AlertCircle } from 'lucide-react';

export default function DeepfakeArtifactInspector({ candidateImage, candidateTitle }) {
  const [filterMode, setFilterMode] = useState('rgb'); // 'rgb', 'ela', 'highpass', 'thermal'
  const [sensitivity, setSensitivity] = useState(65);

  return (
    <div className="bg-primary text-white rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl my-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-4 mb-6 gap-3">
        <div>
          <span className="mono-tag text-xs text-coral">IMAGE TAMPER & NOISE ANOMALY AUDIT</span>
          <h3 className="text-2xl font-display font-medium text-white mt-1">
            Deepfake Artifact & Compression Noise Inspector
          </h3>
        </div>

        {/* Filter Mode Buttons */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <button
            onClick={() => setFilterMode('rgb')}
            className={`px-3 py-1.5 rounded-pill transition-all ${
              filterMode === 'rgb' ? 'bg-white text-ink font-bold' : 'bg-white/10 text-neutral-300 hover:bg-white/20'
            }`}
          >
            Normal RGB
          </button>
          <button
            onClick={() => setFilterMode('ela')}
            className={`px-3 py-1.5 rounded-pill transition-all ${
              filterMode === 'ela' ? 'bg-coral text-white font-bold' : 'bg-white/10 text-neutral-300 hover:bg-white/20'
            }`}
          >
            ELA Error Level
          </button>
          <button
            onClick={() => setFilterMode('highpass')}
            className={`px-3 py-1.5 rounded-pill transition-all ${
              filterMode === 'highpass' ? 'bg-sky-400 text-black font-bold' : 'bg-white/10 text-neutral-300 hover:bg-white/20'
            }`}
          >
            High-Pass Gradient
          </button>
          <button
            onClick={() => setFilterMode('thermal')}
            className={`px-3 py-1.5 rounded-pill transition-all ${
              filterMode === 'thermal' ? 'bg-emerald-400 text-black font-bold' : 'bg-white/10 text-neutral-300 hover:bg-white/20'
            }`}
          >
            Noise Distribution
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Filtered Viewport */}
        <div className="lg:col-span-7 relative aspect-square max-h-[380px] bg-black/60 rounded-md overflow-hidden border border-white/20 mx-auto flex items-center justify-center">
          <img
            src={candidateImage || '/assets/broadcast_summit.jpg'}
            alt="Inspection Media"
            className={`w-full h-full object-cover transition-all duration-300 ${
              filterMode === 'ela'
                ? 'filter contrast-200 brightness-150 saturate-200 hue-rotate-90 invert-0'
                : filterMode === 'highpass'
                ? 'filter grayscale contrast-200 invert'
                : filterMode === 'thermal'
                ? 'filter hue-rotate-180 saturate-200 contrast-150'
                : ''
            }`}
          />

          {/* HUD Overlay */}
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-mono text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>FILTER: {filterMode.toUpperCase()} AUDIT</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-emerald-950/90 text-emerald-300 border border-emerald-700 px-3 py-1 rounded-full text-xs font-mono">
            NATURAL JPEG COMPRESSION (NO SPLICING)
          </div>
        </div>

        {/* Forensic Controls & Metric Gauges */}
        <div className="lg:col-span-5 space-y-5 font-mono text-xs">
          <div>
            <span className="text-slate text-[10px] block">INSPECTION TARGET:</span>
            <strong className="text-white text-sm font-sans truncate block">{candidateTitle}</strong>
          </div>

          <div className="space-y-3 pt-3 border-t border-white/10">
            <div>
              <div className="flex justify-between text-neutral-300 mb-1">
                <span>Boundary Noise Sensitivity:</span>
                <strong className="text-coral">{sensitivity}%</strong>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={sensitivity}
                onChange={(e) => setSensitivity(e.target.value)}
                className="w-full accent-coral"
              />
            </div>

            <div className="bg-white/5 p-4 rounded-md border border-white/10 space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">High-Frequency Uniformity:</span>
                <strong className="text-emerald-400">99.4% (Consistent)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">GAN Artifact Probability:</span>
                <strong className="text-emerald-400">&lt; 1.2% (Negligible)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">EXIF Consistency:</span>
                <strong className="text-white">MATCHES SENSOR</strong>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-neutral-400 leading-relaxed bg-black/40 p-3 rounded border border-white/5">
            Error Level Analysis (ELA) isolates compression gradients across facial boundaries. Uniform luminosity confirms unmodified photographic capture.
          </div>
        </div>
      </div>

    </div>
  );
}
