import React from 'react';
import { Globe, Radio, TrendingUp } from 'lucide-react';

export default function LiveMediaTicker({ query, candidates }) {
  const headlines = candidates.map(c => ({
    title: c.title,
    source: c.source,
    score: c.similarity_pct || (c.score * 100)
  }));

  if (headlines.length === 0) return null;

  return (
    <div className="bg-primary text-white border-b border-hairline py-2 px-6 overflow-hidden flex items-center gap-4 text-xs font-mono">
      <div className="flex items-center gap-1.5 shrink-0 bg-coral text-white px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wider">
        <Radio className="w-3 h-3 animate-pulse" />
        <span>LIVE GLOBAL FEED</span>
      </div>

      {/* Marquee ticker */}
      <div className="flex-1 overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-8 animate-marquee">
          {headlines.map((h, i) => (
            <div key={i} className="inline-flex items-center gap-2">
              <span className="text-neutral-400">[{h.source}]</span>
              <span className="text-white font-medium">{h.title}</span>
              <span className="text-emerald-400 font-bold">({h.score.toFixed(1)}% Match)</span>
              <span className="text-neutral-600">•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 text-slate text-[10px] hidden md:block">
        STREAM: REUTERS // AP // BLOOMBERG // WIKIMEDIA
      </div>
    </div>
  );
}
