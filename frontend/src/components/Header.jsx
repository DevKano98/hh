import React from 'react';
import { Cpu, ShieldCheck, ExternalLink, RefreshCw } from 'lucide-react';

export default function Header({ onDeploy, blockchainConnected, blockHeight }) {
  return (
    <>
      {/* 1. Announcement Bar (Cohere Black, 36px, Unica77/Mono Microcopy) */}
      <div className="bg-cohere-black text-white h-9 px-6 flex items-center justify-between text-[12px] font-mono tracking-wide border-b border-white/10">
        <div className="hidden md:flex items-center gap-2 text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>EVM PROTOCOL v0.8.19</span>
        </div>
        <div className="flex items-center gap-2 mx-auto">
          <span className="inline-block w-2 h-2 rounded-full bg-coral animate-ping"></span>
          <span>TraceLens Enterprise Provenance — Local EVM Anchor Active</span>
          <a href="#blockchain-section" className="underline hover:text-coral transition-colors ml-2 flex items-center gap-1">
            <span>Inspect Smart Contract</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="text-[11px] text-muted mono-tag">CONSENT-BASED SYSTEM</div>
      </div>

      {/* 2. Global Navigation */}
      <nav className="border-b border-hairline sticky top-0 bg-canvas/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo & Badge */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-mono font-bold text-sm shadow-sm">
              TL
            </div>
            <span className="text-xl font-display font-semibold tracking-tight text-cohere-black">
              TraceLens
            </span>
            <span className="border border-hairline px-2.5 py-0.5 rounded-full text-[11px] mono-tag text-slate bg-soft-stone/50">
              Enterprise 2026
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink">
            <a href="#ingestion-section" className="hover:text-action-blue transition-colors">Ingestion</a>
            <a href="#discovery-section" className="hover:text-action-blue transition-colors">Web Discovery</a>
            <a href="#blockchain-section" className="hover:text-action-blue transition-colors">Blockchain Proof</a>
            <a href="#tamper-section" className="hover:text-action-blue transition-colors">Tamper Simulation</a>
            <a href="#audit-section" className="hover:text-action-blue transition-colors">Audit Registry</a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onDeploy}
              className="inline-flex items-center gap-2 border border-ink px-4 py-2 rounded-pill text-xs font-medium hover:bg-soft-stone transition-all active:scale-95"
            >
              <Cpu className="w-3.5 h-3.5 text-slate" />
              <span>Deploy Contract</span>
            </button>
            <a
              href="#ingestion-section"
              className="bg-primary text-white px-5 py-2.5 rounded-pill text-xs font-medium hover:bg-cohere-black transition-all shadow-sm flex items-center gap-2"
            >
              <span>Launch Ingestion</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
