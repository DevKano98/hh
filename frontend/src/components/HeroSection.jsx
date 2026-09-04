import React from 'react';
import { ArrowRight, ShieldCheck, Lock, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-pale-green text-deep-green text-xs font-mono mb-6 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-deep-green animate-pulse"></span>
          <span>AUTONOMOUS MEDIA PROVENANCE ARCHITECTURE</span>
        </div>

        <h1 className="hero-headline text-5xl sm:text-7xl lg:text-[84px] font-normal text-cohere-black mb-8">
          Visual media discovery & immutable blockchain provenance.
        </h1>

        <p className="text-lg sm:text-xl text-slate max-w-2xl leading-relaxed mb-10">
          Ingest authorized reference portrait streams, compute transient 512-dimensional ArcFace embeddings, discover candidate captures across public web indexes, and anchor deterministic SHA-256 evidence packages to the EVM blockchain.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#ingestion-section"
            className="bg-primary text-white px-8 py-4 rounded-pill text-sm font-medium hover:bg-cohere-black transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-98"
          >
            <span>Begin Forensic Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#tamper-section"
            className="text-ink text-sm font-medium underline underline-offset-4 hover:text-action-blue transition-colors px-4 py-2"
          >
            Test Cryptographic Tampering →
          </a>
        </div>
      </div>
    </section>
  );
}
