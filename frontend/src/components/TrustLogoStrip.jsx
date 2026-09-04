import React from 'react';
import { Binary, Blocks, Radar, LockKeyhole } from 'lucide-react';

export default function TrustLogoStrip() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-20">
      <div className="pt-10 border-t border-zinc-200/80 text-center">
        <p className="text-[11px] font-mono font-medium text-zinc-500 uppercase tracking-wider mb-8">
          Enterprise Cryptographic Assurance & Standards
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white border border-zinc-200/80 shadow-subtle hover:border-zinc-300 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700">
              <Binary className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-zinc-900">Deterministic Hash</div>
              <div className="text-[11px] font-mono text-zinc-500">FIPS 180-4 SHA-256</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white border border-zinc-200/80 shadow-subtle hover:border-zinc-300 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700">
              <Blocks className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-zinc-900">EVM Immutability</div>
              <div className="text-[11px] font-mono text-zinc-500">EvidenceRegistry.sol</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white border border-zinc-200/80 shadow-subtle hover:border-zinc-300 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700">
              <Radar className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-zinc-900">Live Web Discovery</div>
              <div className="text-[11px] font-mono text-zinc-500">Multi-Vector Scraper</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white border border-zinc-200/80 shadow-subtle hover:border-zinc-300 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700">
              <LockKeyhole className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-zinc-900">Zero Retention</div>
              <div className="text-[11px] font-mono text-zinc-500">Non-Custodial Face Vectors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
