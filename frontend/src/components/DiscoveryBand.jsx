import React, { useState } from 'react';
import { Search, Compass, Loader2 } from 'lucide-react';
import CandidateCard from './CandidateCard';

export default function DiscoveryBand({
  query,
  setQuery,
  onSearch,
  isSearching,
  candidates,
  selectedCandidate,
  onSelectCandidate
}) {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All Public Web', 'News Portals', 'Broadcast Streams', 'Media Archives'];

  return (
    <section id="discovery-section" className="bg-deep-green text-white py-20 my-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="mono-tag text-xs text-coral-soft">STEP 02 // LIVE WEB DISCOVERY & RECOGNITION</span>
          <h2 className="text-3xl sm:text-5xl font-display font-normal tracking-tight mt-2 text-white">
            Multi-source candidate indexing & cosine similarity verification.
          </h2>
          <p className="text-neutral-300 mt-4 text-base leading-relaxed">
            Query publicly indexed web portals, extract facial geometries from candidate imagery, and rank candidates against the reference embedding vector using cosine distance metrics.
          </p>
        </div>

        {/* Discovery Controls Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/15 shadow-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch();
            }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8"
          >
            <div className="flex-1 w-full relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search keywords (e.g. portrait human face news keynote summit)..."
                className="w-full bg-black/30 border border-white/20 rounded-pill pl-12 pr-4 py-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-coral transition-colors font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full md:w-auto bg-white text-ink px-8 py-3 rounded-pill text-xs font-semibold hover:bg-coral hover:text-white transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-coral" />
                  <span>Querying Web Indexes...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Execute Live Discovery</span>
                </>
              )}
            </button>
          </form>

          {/* Coral Taxonomy Filter Chips */}
          <div className="flex flex-wrap gap-2 items-center text-xs">
            <span className="text-neutral-300 mono-tag mr-2">INDEX FILTER:</span>
            {filters.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  type="button"
                  className={`px-3.5 py-1 rounded-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-coral text-white'
                      : 'bg-transparent border border-coral text-coral-soft hover:bg-coral/20'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Discovered Candidates Grid */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-display font-medium text-white">Discovered Candidate Matches</h3>
            <span className="text-xs font-mono text-neutral-300 bg-white/10 px-3 py-1 rounded-full">
              {candidates.length} Candidates Analyzed
            </span>
          </div>

          {candidates.length === 0 ? (
            <div className="py-16 text-center border border-white/10 rounded-lg bg-white/5">
              <Compass className="w-12 h-12 mx-auto text-neutral-400 mb-3" />
              <p className="text-base text-neutral-200 font-medium">No Candidates Discovered Yet</p>
              <p className="text-xs text-neutral-400 mt-1">Click "Execute Live Discovery" to query public indexes.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map((cand) => (
                <CandidateCard
                  key={cand.id}
                  candidate={cand}
                  onSelect={onSelectCandidate}
                  isSelected={selectedCandidate?.id === cand.id}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
