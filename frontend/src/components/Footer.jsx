import React from 'react';
import { ShieldCheck, Cpu, Database } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-800/80 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-zinc-100 text-zinc-950 rounded-lg flex items-center justify-center font-mono font-bold text-xs shadow-sm">
                TL
              </div>
              <span className="text-base font-semibold text-zinc-100 tracking-tight">TraceLens</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-medium border border-emerald-500/20">
                v2.4 Enterprise
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Cryptographic visual provenance and deepfake biometric intelligence platform. Adheres to FIPS 180-4 SHA-256 standards, EVM immutable logs, and live zero-retention vector indexing.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NON-CUSTODIAL FORENSIC ENGINE</span>
            </div>
          </div>

          {/* Architecture Specs */}
          <div>
            <h5 className="text-[11px] font-mono uppercase tracking-wider text-zinc-200 font-semibold mb-4 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              Forensic Pipeline
            </h5>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="hover:text-zinc-200 transition-colors cursor-pointer">ArcFace 512-D Cosine Similarity</li>
              <li className="hover:text-zinc-200 transition-colors cursor-pointer">Multi-Source Web Scraper</li>
              <li className="hover:text-zinc-200 transition-colors cursor-pointer">ELA JPEG Quantization Scanner</li>
              <li className="hover:text-zinc-200 transition-colors cursor-pointer">Qwen-3.8B Groq LLM Forensics</li>
            </ul>
          </div>

          {/* Smart Contract Specifications */}
          <div>
            <h5 className="text-[11px] font-mono uppercase tracking-wider text-zinc-200 font-semibold mb-4 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-zinc-400" />
              EVM Architecture
            </h5>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              <li className="text-zinc-300">RPC: <span className="text-zinc-500">127.0.0.1:8545</span></li>
              <li className="text-zinc-300">Contract: <span className="text-zinc-500">EvidenceRegistry.sol</span></li>
              <li className="text-zinc-300">Hash: <span className="text-zinc-500">SHA-256 Canonical</span></li>
              <li className="text-zinc-300">Storage: <span className="text-zinc-500">Zero-Persistence SQLite</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <p>© 2026 TraceLens Inc. Non-Custodial Forensic Research Platform.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              All Systems Operational
            </span>
            <span>Deterministic Provenance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
