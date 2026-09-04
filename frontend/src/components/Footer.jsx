import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16 border-t border-hairline">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white text-ink rounded-md flex items-center justify-center font-mono font-bold text-xs">
                TL
              </div>
              <span className="text-xl font-display font-semibold">TraceLens</span>
            </div>
            <p className="text-xs text-muted leading-relaxed max-w-sm">
              Enterprise AI visual media provenance system adhering to the Cohere 2026 enterprise design specification. Built with InsightFace, DuckDuckGo Search, Solidity, and Web3.
            </p>
            <div className="mt-4 text-[11px] mono-tag text-coral font-semibold">
              FOR CONSENTED FORENSIC RESEARCH ONLY
            </div>
          </div>

          {/* Architecture Links */}
          <div>
            <h5 className="text-xs mono-tag text-white mb-4">Architecture</h5>
            <ul className="space-y-2.5 text-xs text-muted">
              <li><a href="#ingestion-section" className="hover:text-white transition-colors">ArcFace Vector Embeddings</a></li>
              <li><a href="#discovery-section" className="hover:text-white transition-colors">DuckDuckGo Public Indexing</a></li>
              <li><a href="#blockchain-section" className="hover:text-white transition-colors">EvidenceRegistry.sol</a></li>
              <li><a href="#tamper-section" className="hover:text-white transition-colors">Cryptographic Bit-Flipper</a></li>
            </ul>
          </div>

          {/* Node Specifications */}
          <div>
            <h5 className="text-xs mono-tag text-white mb-4">EVM Node</h5>
            <ul className="space-y-2.5 text-xs text-muted font-mono">
              <li>RPC: 127.0.0.1:8545</li>
              <li>Solidity: ^0.8.19</li>
              <li>Gas Strategy: Local Devnet</li>
              <li>Hash: SHA-256 (FIPS 180-4)</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-muted">
          <p>© 2026 TraceLens. Local Forensic Research Prototype.</p>
          <div className="flex gap-6 mt-4 sm:mt-0 font-mono">
            <span>Zero Persistent Face Data</span>
            <span>Deterministic Provenance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
