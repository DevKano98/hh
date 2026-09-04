import React, { useState } from 'react';
import { FileJson, Link as LinkIcon, Download, ShieldCheck, CheckCircle, ExternalLink, Loader2, Copy, Check } from 'lucide-react';

export default function BlockchainProvenance({
  evidenceData,
  evidenceHash,
  blockchainRecord,
  onRegister,
  isRegistering,
  onOpenCertificate,
  contractAddress
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyHash = () => {
    if (evidenceHash) {
      navigator.clipboard.writeText(evidenceHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="blockchain-section" className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Canonical JSON Package */}
        <div className="lg:col-span-7 bg-white rounded-xl p-5 sm:p-6 border border-zinc-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[11px] font-mono font-medium">CHAIN 07</span>
                <h3 className="text-base font-semibold text-zinc-900">Deterministic Canonical Evidence</h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-500 bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded">
                KEY-ORDER DETERMINISM
              </span>
            </div>

            <pre className="bg-zinc-950 text-emerald-300 p-4 rounded-lg font-mono text-xs overflow-x-auto border border-zinc-800 min-h-[180px] leading-relaxed shadow-inner">
              {evidenceData ? JSON.stringify(evidenceData, null, 2) : `// Awaiting candidate selection...
{
  "status": "SELECT_CANDIDATE_ABOVE"
}`}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-mono text-zinc-500">SHA-256 Cryptographic Fingerprint:</span>
              <button
                onClick={handleCopyHash}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Hash'}</span>
              </button>
            </div>
            <div className="font-mono text-xs bg-zinc-50 p-2.5 rounded-lg text-zinc-900 break-all border border-zinc-200 select-all font-semibold">
              {evidenceHash || '----------------------------------------------------------------'}
            </div>
          </div>
        </div>

        {/* Right: Blockchain Execution Card */}
        <div className="lg:col-span-5 bg-zinc-950 text-white rounded-xl p-5 sm:p-6 border border-zinc-800 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <span className="font-mono text-xs text-zinc-400">SOLIDITY CONTRACT REGISTRY</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>EVM LOCAL NODE</span>
              </span>
            </div>

            <h4 className="text-lg font-semibold text-white mb-1">Immutable Provenance Proof</h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Anchors SHA-256 fingerprint into <code className="text-zinc-200 font-mono">EvidenceRegistry.sol</code> on local Hardhat EVM (RPC: <span className="text-zinc-400">127.0.0.1:8545</span>).
            </p>

            <div className="space-y-2.5 font-mono text-xs mb-5">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Contract:</span>
                <span className="text-zinc-300 truncate max-w-[170px]" title={contractAddress}>
                  {contractAddress ? `${contractAddress.slice(0, 10)}...${contractAddress.slice(-6)}` : '0x5FbDB2315678afecb367f032d93F642f64180aa3'}
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Evidence ID:</span>
                <span className="text-white font-bold">{blockchainRecord ? `#${blockchainRecord.evidence_id}` : '#--'}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-400">Block Height:</span>
                <span className="text-white">{blockchainRecord ? `#${blockchainRecord.block}` : '#--'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Tx Hash:</span>
                <span className="text-emerald-400 truncate max-w-[170px]">
                  {blockchainRecord ? `${blockchainRecord.tx_hash.slice(0, 14)}...` : '0x--'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-zinc-800">
            <button
              onClick={onRegister}
              disabled={isRegistering || !evidenceHash}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg text-xs transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Committing Tx to EVM Node...</span>
                </>
              ) : blockchainRecord ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Evidence Anchored On-Chain ✓</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  <span>Commit Evidence to EVM Blockchain</span>
                </>
              )}
            </button>

            {blockchainRecord && (
              <button
                onClick={onOpenCertificate}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium py-2 rounded-lg text-xs transition-all border border-zinc-800 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Provenance Certificate</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
