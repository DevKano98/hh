import React from 'react';
import { CheckCircle2, Film, Image as ImageIcon, ExternalLink } from 'lucide-react';

export default function CandidateCard({ candidate, onSelect, isSelected }) {
  const score = candidate.similarity_pct || (candidate.score * 100);
  const isHighMatch = score >= 90;
  const isCandidate = score >= 80;

  const badgeBg = isHighMatch ? 'bg-emerald-500 text-white' : isCandidate ? 'bg-amber-400 text-black' : 'bg-sky-500 text-white';
  const badgeLabel = isHighMatch ? 'LIKELY MATCH' : isCandidate ? 'CANDIDATE' : 'WEAK';

  return (
    <div className={`bg-white/10 backdrop-blur rounded-lg p-5 border transition-all flex flex-col justify-between hover:shadow-lg ${
      isSelected ? 'border-coral ring-2 ring-coral/40 bg-white/15' : 'border-white/15 hover:border-white/30'
    }`}>
      <div>
        {/* Media Thumbnail with Confidence Badge */}
        <div className="relative overflow-hidden rounded-md mb-4 bg-black/40 h-48 group">
          <img
            src={candidate.thumbnail || candidate.url}
            alt={candidate.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600'; }}
          />

          {/* Type Badge */}
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1">
            {candidate.media_type === 'video' ? <Film className="w-3 h-3 text-coral" /> : <ImageIcon className="w-3 h-3 text-sky-400" />}
            <span className="uppercase">{candidate.media_type}</span>
          </div>

          {/* Similarity Badge */}
          <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold shadow-sm ${badgeBg}`}>
            {score.toFixed(1)}% {badgeLabel}
          </span>

          {/* Video Metadata Overlay if Video */}
          {candidate.video_details && (
            <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-sm text-[10px] font-mono text-neutral-300 p-1.5 rounded flex justify-between">
              <span>Best Frame: {candidate.video_details.best_timestamp}</span>
              <span>Matching: {candidate.video_details.matching_frames} frames</span>
            </div>
          )}
        </div>

        {/* Candidate Information */}
        <h4 className="font-display font-medium text-white text-base leading-snug line-clamp-2" title={candidate.title}>
          {candidate.title}
        </h4>

        <div className="mt-2.5 pt-2 border-t border-white/10 space-y-1 text-xs font-mono text-neutral-300">
          <div className="flex justify-between">
            <span className="text-neutral-400">Source:</span>
            <span className="text-white truncate max-w-[170px]">{candidate.source}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">Platform:</span>
            <span className="text-sky-300">{candidate.platform || 'Public Web Index'}</span>
          </div>
        </div>
      </div>

      {/* Select CTA Button */}
      <button
        onClick={() => onSelect(candidate)}
        className={`mt-5 w-full py-2.5 rounded-pill text-xs font-medium transition-all flex items-center justify-center gap-1.5 shadow-sm ${
          isSelected
            ? 'bg-coral text-white font-semibold'
            : 'bg-white text-ink hover:bg-coral hover:text-white'
        }`}
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>{isSelected ? '✓ Selected Evidence' : 'Select For Provenance'}</span>
      </button>
    </div>
  );
}
