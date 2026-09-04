import React from 'react';
import { Cpu, ShieldCheck, ExternalLink, RefreshCw, Terminal, Layers, Activity } from 'lucide-react';

export default function Header({ onDeploy, blockchainConnected, blockHeight, contractAddress }) {
  const shortAddress = contractAddress ? `${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}` : '0x5FbD...80aa3';

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Left: Brand & Breadcrumb */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-zinc-950 text-white rounded-md flex items-center justify-center font-mono font-bold text-xs shadow-sm">
              TL
            </div>
            <span className="font-semibold text-sm tracking-tight text-zinc-900">
              TraceLens
            </span>
          </div>

          <span className="text-zinc-300 font-light">/</span>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
            <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono text-[11px]">v2.4.0</span>
            <span>provenance-engine</span>
          </div>
        </div>

        {/* Center: System Telemetry Indicators */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-600">
            <span className={`w-1.5 h-1.5 rounded-full ${blockchainConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            <span>EVM NODE: {blockchainConnected ? `BLOCK #${blockHeight || 3}` : 'OFFLINE'}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-600">
            <span className="text-zinc-400">CONTRACT:</span>
            <span className="text-zinc-800 font-medium">{shortAddress}</span>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onDeploy}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 active:bg-zinc-100 transition-all shadow-xs"
          >
            <Cpu className="w-3.5 h-3.5 text-zinc-500" />
            <span>Redeploy Node</span>
          </button>

          <a
            href="https://github.com/DevKano98/hh"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-950 text-white text-xs font-medium hover:bg-zinc-800 active:bg-zinc-900 transition-all shadow-xs"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>GitHub Repo</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>
        </div>

      </div>
    </header>
  );
}

