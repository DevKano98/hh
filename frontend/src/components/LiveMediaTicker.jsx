import React from 'react';
import { Radio } from 'lucide-react';

export default function LiveMediaTicker({ query, candidates }) {
  const headlines = candidates.map(c => ({
    title: c.title,
    source: c.source,
    score: c.similarity_pct || (c.score * 100)
  }));

  if (headlines.length === 0) return null;

  return (
    <div className="bg-zinc-950 text-zinc-300 border-b border-zinc-800 py-2 px-6 overflow-hidden flex items-center gap-4 text-xs font-mono">
      <div className="flex items-center gap-1.5 shrink-0 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-semibold text-[10px] tracking-wider">
        <Radio className="w-3 h-3 animate-pulse" />
        <span>LIVE FEED</span>
      </div>

      {/* Marquee ticker */}
      <div className="flex-1 overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-8 animate-marquee">
          {headlines.map((h, i) => (
            <div key={i} className="inline-flex items-center gap-2">
              <span className="text-zinc-500">[{h.source}]</span>
              <span className="text-zinc-200 font-medium">{h.title}</span>
              <span className="text-emerald-400 font-semibold font-mono">({h.score.toFixed(1)}% Match)</span>
              <span className="text-zinc-700">•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 text-zinc-500 text-[10px] hidden md:block">
        STREAM: REUTERS // AP // BLOOMBERG // WIKIMEDIA
      </div>
    </div>
  );
}
