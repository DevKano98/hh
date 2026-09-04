import React from 'react';
import { FileJson, Link as LinkIcon, Download, ShieldCheck, CheckCircle, ExternalLink, Loader2 } from 'lucide-react';

export default function BlockchainProvenance({
  evidenceData,
  evidenceHash,
  blockchainRecord,
  onRegister,
  isRegistering,
  onOpenCertificate,
  contractAddress
}) {
  return (
    <section id="blockchain-section" className="max-w-7xl mx-auto px-6 py-16">
      <div className="max-w-3xl mb-12">
        <span className="mono-tag text-xs text-action-blue">STEP 03 // DETERMINISTIC CANONICAL EVIDENCE & BLOCKCHAIN ANCHOR</span>
        <h2 className="text-3xl sm:text-5xl font-display font-normal tracking-tight mt-2 text-ink">
          Cryptographic SHA-256 fingerprinting & on-chain immutability.
        </h2>
        <p className="text-slate mt-4 text-base leading-relaxed">
          When candidate evidence is verified, deterministic JSON serialization formats the metadata without whitespace variation. The resultant 256-bit hash is committed to <code className="font-mono text-ink font-semibold">EvidenceRegistry.sol</code> on the local EVM node.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Canonical JSON Package (7 Col) */}
        <div className="lg:col-span-7 bg-white rounded-lg p-6 sm:p-8 border border-border-light shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border-light pb-4 mb-5">
              <div className="flex items-center gap-2">
                <FileJson className="w-5 h-5 text-action-blue" />
                <span className="font-display font-semibold text-ink text-base">Canonical Evidence Package</span>
              </div>
              <span className="text-[11px] mono-tag text-slate bg-soft-stone px-2 py-0.5 rounded">
                KEY-ORDER DETERMINISM
              </span>
            </div>

            <pre className="bg-primary text-emerald-300 p-5 rounded-md font-mono text-xs overflow-x-auto border border-hairline min-h-[200px] leading-relaxed shadow-inner">
              {evidenceData ? JSON.stringify(evidenceData, null, 2) : `// Awaiting candidate selection in Step 2...
{
  "status": "IDLE"
}`}
            </pre>
          </div>

          <div className="mt-6 pt-4 border-t border-border-light">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs mono-tag text-slate">SHA-256 Cryptographic Fingerprint</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                256-BIT DIGEST
              </span>
            </div>
            <div className="font-mono text-xs bg-soft-stone p-3.5 rounded-md text-ink break-all border border-card-border select-all font-semibold">
              {evidenceHash || '----------------------------------------------------------------'}
            </div>
          </div>
        </div>

        {/* Right: Blockchain Execution Card (5 Col, #071829 Dark Navy) */}
        <div className="lg:col-span-5 bg-dark-navy text-white rounded-lg p-6 sm:p-8 flex flex-col justify-between shadow-xl border border-white/10">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <span className="font-mono text-xs text-sky-400">SOLIDITY CONTRACT REGISTRY</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>EVM LOCAL NODE</span>
              </span>
            </div>

            <h4 className="text-2xl font-display font-medium text-white mb-2">Immutable Provenance</h4>
            <p className="text-xs text-neutral-300 leading-relaxed mb-6">
              Transacts with <code className="text-sky-300 font-mono">EvidenceRegistry.sol</code> on local Hardhat EVM (RPC: <span className="text-neutral-400">127.0.0.1:8545</span>).
            </p>

            <div className="space-y-3 font-mono text-xs mb-6">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Contract Address:</span>
                <span className="text-sky-300 truncate max-w-[170px]" title={contractAddress}>
                  {contractAddress ? `${contractAddress.slice(0, 10)}...${contractAddress.slice(-6)}` : '0x5FbDB2315678afecb367f032d93F642f64180aa3'}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Registered ID:</span>
                <span className="text-white font-bold">{blockchainRecord ? `#${blockchainRecord.evidence_id}` : '#--'}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Block Height:</span>
                <span className="text-white">{blockchainRecord ? `#${blockchainRecord.block}` : '#--'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Transaction Hash:</span>
                <span className="text-emerald-400 truncate max-w-[170px]">
                  {blockchainRecord ? `${blockchainRecord.tx_hash.slice(0, 12)}...` : '0x--'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10">
            {blockchainRecord ? (
              <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-300 p-3 rounded-md text-xs font-mono flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>ON-CHAIN ANCHOR CONFIRMED ✓</span>
                </div>
                <span className="text-[10px] text-neutral-400">Block #{blockchainRecord.block}</span>
              </div>
            ) : (
              <button
                onClick={onRegister}
                disabled={!evidenceHash || isRegistering}
                className="w-full bg-action-blue hover:bg-blue-600 text-white font-medium py-3 rounded-pill text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Broadcasting EVM Transaction...</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4" />
                    <span>Register Evidence On-Chain</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onOpenCertificate}
              disabled={!evidenceData}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-pill text-xs transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Generate Audit Certificate</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
