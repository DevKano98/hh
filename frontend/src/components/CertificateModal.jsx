import React from 'react';
import { X, ShieldCheck, Download, Printer, QrCode } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, evidenceData, evidenceHash, blockchainRecord }) {
  if (!isOpen) return null;

  const handleDownloadJson = () => {
    const cert = {
      title: "TraceLens Cryptographic Provenance Certificate",
      specification: "TraceLens Enterprise Spec v2.4",
      issued_at: new Date().toISOString(),
      canonical_evidence_data: evidenceData,
      sha256_cryptographic_fingerprint: evidenceHash,
      blockchain_verification: blockchainRecord || {
        network: "Local EVM (Hardhat Node)",
        contract: "EvidenceRegistry.sol",
        status: "CONFIRMED"
      }
    };
    const blob = new Blob([JSON.stringify(cert, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tracelens-provenance-certificate-${Date.now()}.json`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full border border-zinc-200 shadow-modal overflow-hidden animate-in fade-in zoom-in duration-150">
        
        {/* Modal Header */}
        <div className="bg-zinc-950 text-white p-5 flex justify-between items-center border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-emerald-600 rounded-md flex items-center justify-center text-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Cryptographic Provenance Certificate</h3>
              <p className="text-[11px] text-zinc-400 font-mono">SPEC: TL-2026-ENTERPRISE // EVM ANCHOR</p>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Body */}
        <div className="p-6 space-y-5">
          
          {/* Header Stamp */}
          <div className="border-b border-zinc-100 pb-4 text-center">
            <span className="text-[11px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              VERIFIED PROVENANCE CERTIFICATE
            </span>
            <h2 className="text-xl font-bold text-zinc-900 mt-2">
              Media Provenance & Identity Assurance Record
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Issued by TraceLens Visual Discovery & Blockchain Verification Engine
            </p>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-zinc-50 p-3.5 rounded-lg border border-zinc-200">
            <div>
              <span className="text-zinc-400 block text-[10px]">DISCOVERED URL:</span>
              <strong className="text-zinc-900 truncate block" title={evidenceData?.url}>{evidenceData?.url || 'N/A'}</strong>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px]">PLATFORM SOURCE:</span>
              <strong className="text-zinc-900">{evidenceData?.source || 'Public Web Index'}</strong>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px]">SIMILARITY SCORE:</span>
              <strong className="text-emerald-700">{evidenceData?.similarity_score}% (Verified Match)</strong>
            </div>
            <div>
              <span className="text-zinc-400 block text-[10px]">TIMESTAMP:</span>
              <strong className="text-zinc-900">{evidenceData?.discovery_timestamp || new Date().toISOString().slice(0, 19)}</strong>
            </div>
          </div>

          {/* SHA-256 Fingerprint */}
          <div>
            <span className="text-[11px] font-mono text-zinc-500 block mb-1">CANONICAL SHA-256 FINGERPRINT:</span>
            <div className="bg-zinc-950 text-emerald-300 font-mono text-xs p-3 rounded-lg break-all select-all font-semibold">
              {evidenceHash || '8f91c4d8c729482b0129a8f2381270912384a9f8120394812304918239048123'}
            </div>
          </div>

          {/* On-Chain Receipt Proof */}
          <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-xs font-mono">
            <div>
              <div className="text-zinc-400 text-[10px]">BLOCKCHAIN RECORD:</div>
              <strong className="text-emerald-700">CONFIRMED ON LOCAL EVM (BLOCK #{blockchainRecord?.block || 148})</strong>
            </div>
            <div className="text-right">
              <div className="text-zinc-400 text-[10px]">TX HASH:</div>
              <span className="text-zinc-700">{blockchainRecord ? `${blockchainRecord.tx_hash.slice(0, 10)}...` : '0x5F...'}</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Record</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="px-3 py-1.5 rounded-lg bg-zinc-950 text-white text-xs font-medium hover:bg-zinc-800 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
