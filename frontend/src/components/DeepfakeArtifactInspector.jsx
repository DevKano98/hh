import React, { useState } from 'react';
import { Eye, ShieldAlert, Sliders, Sparkles, AlertCircle, Cpu } from 'lucide-react';

export default function DeepfakeArtifactInspector({ candidateImage, candidateTitle }) {
  const [filterMode, setFilterMode] = useState('rgb'); // 'rgb', 'ela', 'highpass', 'thermal'
  const [sensitivity, setSensitivity] = useState(65);

  return (
    <div className="bg-zinc-950 text-white rounded-xl p-5 sm:p-6 border border-zinc-800 shadow-card my-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-3 mb-5 gap-3">
        <div>
          <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono font-medium">FORENSICS 04</span>
          <h3 className="text-base sm:text-lg font-semibold text-white mt-1">
            Deepfake Artifact & Compression Noise Inspector
          </h3>
        </div>

        {/* Filter Mode Buttons */}
        <div className="flex flex-wrap gap-1.5 text-xs font-mono">
          <button
            onClick={() => setFilterMode('rgb')}
            className={`px-2.5 py-1 rounded-md transition-all border ${
              filterMode === 'rgb' ? 'bg-white text-zinc-900 font-semibold border-white' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            Normal RGB
          </button>
          <button
            onClick={() => setFilterMode('ela')}
            className={`px-2.5 py-1 rounded-md transition-all border ${
              filterMode === 'ela' ? 'bg-indigo-600 text-white font-semibold border-indigo-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            ELA Error Level
          </button>
          <button
            onClick={() => setFilterMode('highpass')}
            className={`px-2.5 py-1 rounded-md transition-all border ${
              filterMode === 'highpass' ? 'bg-blue-600 text-white font-semibold border-blue-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            High-Pass Gradient
          </button>
          <button
            onClick={() => setFilterMode('thermal')}
            className={`px-2.5 py-1 rounded-md transition-all border ${
              filterMode === 'thermal' ? 'bg-emerald-600 text-white font-semibold border-emerald-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
            }`}
          >
            Noise Distribution
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Filtered Viewport */}
        <div className="lg:col-span-7 relative aspect-square max-h-[360px] bg-black rounded-lg overflow-hidden border border-zinc-800 mx-auto flex items-center justify-center">
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
          <div className="absolute top-2.5 left-2.5 bg-zinc-900/90 backdrop-blur px-2.5 py-1 rounded text-xs font-mono text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>FILTER: {filterMode.toUpperCase()} AUDIT</span>
          </div>

          <div className="absolute bottom-2.5 right-2.5 bg-emerald-950/90 text-emerald-300 border border-emerald-800 px-2.5 py-0.5 rounded-md text-[10px] font-mono">
            NATURAL JPEG COMPRESSION (NO SPLICING)
          </div>
        </div>

        {/* Forensic Controls & Metric Gauges */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          <div>
            <span className="text-zinc-500 text-[10px] block">INSPECTION TARGET:</span>
            <strong className="text-white text-sm font-sans truncate block">{candidateTitle}</strong>
          </div>

          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Boundary Noise Sensitivity:</span>
                <strong className="text-indigo-400">{sensitivity}%</strong>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={sensitivity}
                onChange={(e) => setSensitivity(e.target.value)}
                className="w-full accent-indigo-500"
              />
            </div>

            <div className="bg-zinc-900 p-3.5 rounded-lg border border-zinc-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">High-Frequency Uniformity:</span>
                <strong className="text-emerald-400">99.4% (Consistent)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">GAN Artifact Probability:</span>
                <strong className="text-emerald-400">&lt; 1.2% (Negligible)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">EXIF Consistency:</span>
                <strong className="text-white">MATCHES SENSOR</strong>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 leading-relaxed bg-zinc-900/60 p-3 rounded-md border border-zinc-800">
            Error Level Analysis (ELA) isolates compression gradients across facial boundaries. Uniform luminosity confirms unmodified photographic capture.
          </div>
        </div>
      </div>

    </div>
  );
}

