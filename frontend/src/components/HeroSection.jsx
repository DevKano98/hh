import React from 'react';
import { ArrowRight, ShieldCheck, Lock, Sparkles, Terminal, Activity, Database } from 'lucide-react';

export default function HeroSection({ onStartDiscovery }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10">
      <div className="max-w-3xl">
        
        {/* Release / Status Pill */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-700 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-zinc-900">TraceLens Enterprise</span>
          <span className="text-zinc-400">•</span>
          <span>EVM Provenance & AI Forensics</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.1] mb-5">
          Biometric media provenance, verified on-chain.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed mb-8">
          Ingest authorized portrait references, scrape live open-source web archives, verify 512-dimensional facial landmarks, and anchor immutable SHA-256 evidence packages directly to an EVM smart contract.
        </p>

        {/* CTA Strip */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#ingestion-section"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 text-white text-xs font-medium hover:bg-zinc-800 active:bg-zinc-900 transition-all shadow-xs"
          >
            <span>Launch Ingestion Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="#discovery-section"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-200 bg-white text-zinc-700 text-xs font-medium hover:bg-zinc-50 hover:text-zinc-900 transition-all shadow-xs"
          >
            <span>Explore Discovery Stream</span>
          </a>

          <a
            href="#tamper-section"
            className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors px-2 py-1 flex items-center gap-1"
          >
            <span>Simulate Tamper Detection →</span>
          </a>
        </div>

        {/* High-Level Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 pt-6 border-t border-zinc-200/80">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>512-D ArcFace Biometrics</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-700">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>Live Wikipedia & RSS Wire</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-700">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>SHA-256 Immutability</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-700">
            <Database className="w-4 h-4 text-purple-600" />
            <span>Local Vector Store</span>
          </div>
        </div>

      </div>
    </section>
  );
}

