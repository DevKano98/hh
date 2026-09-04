import React from 'react';
import { CheckCircle2, Film, Image as ImageIcon, ExternalLink, Globe, ShieldCheck } from 'lucide-react';

export default function CandidateCard({ candidate, onSelect, isSelected }) {
  const score = candidate.similarity_pct || (candidate.score * 100);
  const isHighMatch = score >= 90;
  const isCandidate = score >= 80;

  const badgeBg = isHighMatch
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : isCandidate
    ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-zinc-100 text-zinc-600 border-zinc-200';

  const badgeLabel = isHighMatch ? 'VERIFIED MATCH' : isCandidate ? 'PROBABLE MATCH' : 'CORRELATED';

  return (
    <div
      onClick={() => onSelect(candidate)}
      className={`bg-white rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between group ${
        isSelected
          ? 'border-zinc-900 ring-2 ring-zinc-900/10 shadow-card-hover bg-zinc-50/50'
          : 'border-zinc-200 hover:border-zinc-300 hover:shadow-card shadow-subtle'
      }`}
    >
      <div>
        {/* Media Thumbnail with Badges */}
        <div className="relative overflow-hidden rounded-lg mb-3 bg-zinc-100 aspect-[16/10]">
          <img
            src={candidate.thumbnail || candidate.url}
            alt={candidate.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600'; }}
          />

          {/* Type Badge */}
          <div className="absolute top-2.5 left-2.5 bg-zinc-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1">
            {candidate.media_type === 'video' ? <Film className="w-3 h-3 text-amber-400" /> : <ImageIcon className="w-3 h-3 text-blue-400" />}
            <span className="uppercase">{candidate.media_type}</span>
          </div>

          {/* Similarity Badge */}
          <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${badgeBg}`}>
            {score.toFixed(1)}%
          </span>

          {/* Video Metadata Overlay */}
          {candidate.video_details && (
            <div className="absolute bottom-2 left-2 right-2 bg-zinc-900/90 backdrop-blur-sm text-[10px] font-mono text-zinc-300 px-2 py-1 rounded flex justify-between">
              <span>Timestamp: {candidate.video_details.best_timestamp}</span>
              <span>{candidate.video_details.matching_frames} frames</span>
            </div>
          )}
        </div>

        {/* Candidate Information */}
        <div className="mb-2">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            {candidate.source || 'Public Index'}
          </span>
          <h4 className="font-semibold text-zinc-900 text-sm leading-snug line-clamp-2" title={candidate.title}>
            {candidate.title}
          </h4>
        </div>

        {candidate.article_text && (
          <p className="text-xs text-zinc-500 line-clamp-2 mt-1">
            {candidate.article_text}
          </p>
        )}
      </div>

      {/* Select CTA Button */}
      <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
        <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
          <Globe className="w-3 h-3 text-zinc-400" />
          <span className="truncate max-w-[130px]">{candidate.source}</span>
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(candidate);
          }}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1 border ${
            isSelected
              ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
              : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
          }`}
        >
          <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-zinc-400'}`} />
          <span>{isSelected ? 'Active Target' : 'Select'}</span>
        </button>
      </div>
    </div>
  );
}

