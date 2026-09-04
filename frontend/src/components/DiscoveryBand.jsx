import React, { useState } from 'react';
import { Search, Compass, Loader2, Sparkles, Filter, RefreshCw, Globe } from 'lucide-react';
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
  const filters = ['All Sources', 'Wikipedia Verified', 'Wikimedia Commons', 'Google News'];

  const filteredCandidates = candidates.filter((c) => {
    if (activeFilter === 'All Sources' || activeFilter === 'All') return true;
    if (activeFilter === 'Wikipedia Verified') return c.source?.includes('Wikipedia');
    if (activeFilter === 'Wikimedia Commons') return c.source?.includes('Commons') || c.source?.includes('Global');
    if (activeFilter === 'Google News') return c.source?.includes('News') || c.media_type === 'news';
    return true;
  });

  return (
    <section id="discovery-section" className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
      
      {/* Header & Search Control */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-zinc-200 shadow-card mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[11px] font-mono font-medium">DISCOVERY 02</span>
              <h3 className="text-lg font-semibold text-zinc-900">Live Web Index & Media Telemetry</h3>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">Scrapes Wikipedia official galleries, Wikimedia Commons press captures, and Google News RSS in real-time</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-md">
              {candidates.length} CANDIDATES INDEXED
            </span>
          </div>
        </div>

        {/* Search Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className="flex flex-col sm:flex-row gap-2.5 mb-4"
        >
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reference subject keywords (e.g. Lionel Messi, Samantha, Disha Patani)..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-10 pr-4 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-950 text-white text-xs font-medium hover:bg-zinc-800 active:bg-zinc-900 transition-all shadow-xs disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>Scraping Web Indexes...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Execute Live Scrape</span>
              </>
            )}
          </button>
        </form>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-1.5 items-center text-xs">
          <span className="text-zinc-400 font-mono text-[11px] mr-1">FILTER:</span>
          {filters.map((f) => {
            const isActive = activeFilter === f || (f === 'All Sources' && activeFilter === 'All');
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                type="button"
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all border ${
                  isActive
                    ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                    : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Discovered Candidates Grid */}
      {filteredCandidates.length === 0 ? (
        <div className="py-16 text-center border border-zinc-200 rounded-xl bg-white shadow-subtle">
          <Compass className="w-10 h-10 mx-auto text-zinc-400 mb-2" />
          <p className="text-sm font-semibold text-zinc-800">No Candidates Found</p>
          <p className="text-xs text-zinc-500 mt-0.5">Click "Execute Live Scrape" to query public open-source repositories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCandidates.map((cand) => (
            <CandidateCard
              key={cand.id}
              candidate={cand}
              onSelect={onSelectCandidate}
              isSelected={selectedCandidate?.id === cand.id}
            />
          ))}
        </div>
      )}

    </section>
  );
}

