import React, { useState } from 'react';
import { Film, Play, Pause, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

export default function VideoTimelineScrubber({ candidate }) {
  const [selectedFrameIdx, setSelectedFrameIdx] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sampled video frames
  const frames = [
    { time: '00:02.100', score: 0.812, label: 'Intro' },
    { time: '00:06.400', score: 0.884, label: 'Podium View' },
    { time: '00:10.800', score: 0.921, label: 'Close Up' },
    { time: '00:14.200', score: 0.984, label: 'Keynote Speech (Peak Match)', peak: true },
    { time: '00:18.600', score: 0.938, label: 'Audience Q&A' },
    { time: '00:22.000', score: 0.892, label: 'Concluding Remarks' },
  ];

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 border border-border-light shadow-sm my-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-hairline pb-4 mb-6 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-coral text-white rounded flex items-center justify-center">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] mono-tag text-slate">FFMPEG VIDEO FRAME TEMPORAL ANALYSIS</span>
            <h3 className="text-xl font-display font-medium text-ink">Broadcast Stream Frame Scrubber</h3>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1 bg-pale-green text-deep-green rounded-full font-bold">
            64 FRAMES SAMPLED (FPS: 0.5)
          </span>
        </div>
      </div>

      {/* Main Selected Frame View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-8">
        <div className="lg:col-span-8 relative aspect-video bg-black rounded-md overflow-hidden border border-border-light shadow-inner group">
          <img
            src="/assets/broadcast_summit.jpg"
            alt="Video Stream Frame"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur text-white px-2.5 py-1 rounded text-xs font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>FRAME TIME: {frames[selectedFrameIdx].time}</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-mono font-bold shadow-md">
            SIMILARITY: {(frames[selectedFrameIdx].score * 100).toFixed(1)}%
          </div>
        </div>

        {/* Frame Info */}
        <div className="lg:col-span-4 space-y-4 font-mono text-xs bg-soft-stone/60 p-5 rounded-md border border-card-border">
          <div>
            <span className="text-slate text-[10px] block">FRAME METADATA:</span>
            <strong className="text-ink text-sm font-sans">{frames[selectedFrameIdx].label}</strong>
          </div>

          <div className="space-y-2 pt-2 border-t border-hairline">
            <div className="flex justify-between">
              <span className="text-slate">Timestamp:</span>
              <strong className="text-ink">{frames[selectedFrameIdx].time}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Resolution:</span>
              <strong className="text-ink">3840x2160 UHD</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Codec:</span>
              <strong className="text-ink">H.264 / AAC (48kHz)</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Match State:</span>
              <strong className="text-emerald-700">VERIFIED FACE ✓</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Frame Timeline Thumbnail Strip */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate">
          <span>00:00.000</span>
          <span>TEMPORAL SAMPLING STRIP</span>
          <span>00:24.000</span>
        </div>

        <div className="grid grid-cols-6 gap-3">
          {frames.map((f, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedFrameIdx(idx)}
              className={`p-1 rounded transition-all text-left group ${
                selectedFrameIdx === idx
                  ? 'ring-2 ring-coral bg-coral/10'
                  : 'hover:bg-soft-stone border border-hairline'
              }`}
            >
              <div className="relative aspect-video rounded overflow-hidden bg-black/30 mb-1.5">
                <img
                  src="/assets/broadcast_summit.jpg"
                  alt={`Frame ${idx}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                {f.peak && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                )}
              </div>
              <div className="text-[10px] font-mono flex justify-between">
                <span className="text-slate">{f.time}</span>
                <span className={`font-bold ${f.score > 0.95 ? 'text-emerald-600' : 'text-slate'}`}>
                  {(f.score * 100).toFixed(0)}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
