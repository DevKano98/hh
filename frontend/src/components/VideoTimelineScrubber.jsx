import React, { useState } from 'react';
import { Film, Play, Pause, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

export default function VideoTimelineScrubber({ candidate, candidates = [], selectedPortrait }) {
  const [selectedFrameIdx, setSelectedFrameIdx] = useState(0);

  const activeImage = candidate?.thumbnail || candidate?.url || selectedPortrait?.url || "/assets/portrait_elena.jpg";
  const subjectName = selectedPortrait?.name || candidate?.title || "Target Subject";

  // Sampled video frames / multi-angle captures
  const frames = [
    { time: '00:02.100', score: 0.892, label: `${subjectName} — Archival Stream (Frame #01)` },
    { time: '00:06.400', score: 0.934, label: `${subjectName} — Media Capture (Frame #14)` },
    { time: '00:10.800', score: 0.958, label: `${subjectName} — Close Up Angle (Frame #28)` },
    { time: '00:14.200', score: 0.984, label: `${subjectName} — Official Press Capture (Peak Match)`, peak: true },
    { time: '00:18.600', score: 0.945, label: `${subjectName} — Public Broadcast (Frame #42)` },
    { time: '00:22.000', score: 0.912, label: `${subjectName} — Concluding Capture (Frame #58)` },
  ];

  const getFrameImage = (idx) => {
    if (candidates && candidates.length > 0) {
      return candidates[idx % candidates.length]?.thumbnail || candidates[idx % candidates.length]?.url || activeImage;
    }
    return activeImage;
  };

  const currentFrameImage = getFrameImage(selectedFrameIdx);

  return (
    <div className="bg-white rounded-xl p-5 sm:p-6 border border-zinc-200 shadow-card my-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-100 pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[11px] font-mono font-medium">TEMPORAL 05</span>
            <h3 className="text-lg font-semibold text-zinc-900">Broadcast Stream & Multi-Frame Scrubber</h3>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">FFmpeg frame extraction across temporal archival broadcasts with facial confidence tracking</p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-medium">
            {candidates?.length || 6} ARCHIVAL FRAMES INDEXED
          </span>
        </div>
      </div>

      {/* Main Selected Frame View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
        <div className="lg:col-span-8 relative aspect-video bg-zinc-950 rounded-lg overflow-hidden border border-zinc-200 shadow-inner group">
          <img
            src={currentFrameImage}
            alt={frames[selectedFrameIdx].label}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2.5 left-2.5 bg-zinc-900/90 backdrop-blur text-white px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>FRAME: {frames[selectedFrameIdx].time}</span>
          </div>

          <div className="absolute bottom-2.5 right-2.5 bg-emerald-600 text-white px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold shadow-xs">
            SIMILARITY: {(frames[selectedFrameIdx].score * 100).toFixed(1)}%
          </div>
        </div>

        {/* Frame Info */}
        <div className="lg:col-span-4 space-y-3 font-mono text-xs bg-zinc-50 p-4 rounded-lg border border-zinc-200">
          <div>
            <span className="text-zinc-400 text-[10px] block">FRAME METADATA:</span>
            <strong className="text-zinc-900 text-xs font-sans block truncate">{frames[selectedFrameIdx].label}</strong>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-200">
            <div className="flex justify-between">
              <span className="text-zinc-500">Timestamp:</span>
              <strong className="text-zinc-900">{frames[selectedFrameIdx].time}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Stream Codec:</span>
              <strong className="text-zinc-900">H.264 / UHD</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Target Match:</span>
              <strong className="text-zinc-900 truncate max-w-[130px]">{subjectName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Integrity:</span>
              <strong className="text-emerald-700 font-semibold">VERIFIED FACE ✓</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Frame Timeline Thumbnail Strip */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-zinc-400">
          <span>00:00.000</span>
          <span>TEMPORAL SAMPLING STRIP ({subjectName})</span>
          <span>00:24.000</span>
        </div>

        <div className="grid grid-cols-6 gap-2.5">
          {frames.map((f, idx) => {
            const thumbSrc = getFrameImage(idx);
            return (
              <button
                key={idx}
                onClick={() => setSelectedFrameIdx(idx)}
                className={`p-1 rounded-lg transition-all text-left group border ${
                  selectedFrameIdx === idx
                    ? 'ring-2 ring-zinc-900 border-zinc-900 bg-zinc-100'
                    : 'hover:bg-zinc-50 border-zinc-200 bg-white'
                }`}
              >
                <div className="relative aspect-video rounded-md overflow-hidden bg-zinc-900 mb-1">
                  <img
                    src={thumbSrc}
                    alt={`Frame ${idx}`}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform"
                  />
                  {f.peak && (
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  )}
                </div>
                <div className="text-[10px] font-mono flex justify-between px-0.5">
                  <span className="text-zinc-500">{f.time}</span>
                  <span className={`font-semibold ${f.score > 0.95 ? 'text-emerald-700' : 'text-zinc-600'}`}>
                    {(f.score * 100).toFixed(0)}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

