import React from 'react';
import { Binary, Blocks, Radar, LockKeyhole } from 'lucide-react';

export default function TrustLogoStrip() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-20">
      <div className="pt-10 border-t border-hairline text-center">
        <p className="text-xs mono-tag text-muted mb-8 tracking-widest">
          ENTERPRISE CRYPTOGRAPHIC STANDARDS & TRUST ASSURANCES
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-85">
          <div className="flex items-center justify-center gap-2.5 text-ink font-display font-medium text-sm">
            <Binary className="w-5 h-5 text-slate" />
            <span>Deterministic SHA-256</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 text-ink font-display font-medium text-sm">
            <Blocks className="w-5 h-5 text-slate" />
            <span>Solidity EVM Registry</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 text-ink font-display font-medium text-sm">
            <Radar className="w-5 h-5 text-slate" />
            <span>Live Public Indexing</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 text-ink font-display font-medium text-sm">
            <LockKeyhole className="w-5 h-5 text-slate" />
            <span>Zero Persistent Identity</span>
          </div>
        </div>
      </div>
    </section>
  );
}
