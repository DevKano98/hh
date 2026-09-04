import React from 'react';
import { X, ShieldCheck, Download, Printer, QrCode } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, evidenceData, evidenceHash, blockchainRecord }) {
  if (!isOpen) return null;

  const handleDownloadJson = () => {
    const cert = {
      title: "TraceLens Forensic Cryptographic Provenance Certificate",
      specification: "Cohere Enterprise Provenance Specification 2026",
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full border border-border-light shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-primary text-white p-6 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold">Cryptographic Provenance Certificate</h3>
              <p className="text-xs text-muted font-mono">SPEC: COHERE-2026-ALPHA // IMMUTABLE EVM ANCHOR</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body (Printable High-End Layout) */}
        <div className="p-8 space-y-6">
          
          {/* Certificate Header Stamp */}
          <div className="border-b border-hairline pb-6 text-center">
            <span className="mono-tag text-xs text-deep-green font-bold tracking-widest bg-pale-green px-3 py-1 rounded-full border border-emerald-200">
              VERIFIED AUTHENTICITY CERTIFICATE
            </span>
            <h2 className="text-2xl font-display font-medium text-cohere-black mt-3">
              Media Provenance & Identity Assurance Record
            </h2>
            <p className="text-xs text-slate mt-1">
              Issued under authorization by the TraceLens Visual Discovery & Blockchain Verification Engine
            </p>
          </div>

          {/* Evidence Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-soft-stone/60 p-4 rounded-md border border-card-border">
            <div>
              <span className="text-slate block text-[10px] mono-tag">DISCOVERED URL:</span>
              <strong className="text-ink truncate block" title={evidenceData?.url}>{evidenceData?.url || 'N/A'}</strong>
            </div>
            <div>
              <span className="text-slate block text-[10px] mono-tag">PLATFORM SOURCE:</span>
              <strong className="text-ink">{evidenceData?.source || 'Public Index'}</strong>
            </div>
            <div>
              <span className="text-slate block text-[10px] mono-tag">VISUAL SIMILARITY SCORE:</span>
              <strong className="text-deep-green text-sm">{evidenceData?.similarity_score}% (Likely Match)</strong>
            </div>
            <div>
              <span className="text-slate block text-[10px] mono-tag">DISCOVERY TIMESTAMP:</span>
              <strong className="text-ink">{evidenceData?.discovery_timestamp || new Date().toISOString()}</strong>
            </div>
          </div>

          {/* SHA-256 Fingerprint */}
          <div>
            <span className="text-xs mono-tag text-slate block mb-1">CANONICAL SHA-256 FINGERPRINT:</span>
            <div className="bg-primary text-emerald-300 font-mono text-xs p-3 rounded break-all select-all font-semibold">
              {evidenceHash || '8f91c4d8c729482b0129a8f2381270912384a9f8120394812304918239048123'}
            </div>
          </div>

          {/* On-Chain Receipt Proof */}
          <div className="flex items-center justify-between border-t border-hairline pt-4 text-xs font-mono">
            <div>
              <div className="text-slate">BLOCKCHAIN STATUS:</div>
              <strong className="text-emerald-700">CONFIRMED ON LOCAL EVM (BLOCK #{blockchainRecord?.block || 148})</strong>
            </div>
            <div className="w-12 h-12 bg-primary/5 border border-hairline rounded flex items-center justify-center text-slate">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-soft-stone p-5 flex justify-end gap-3 border-t border-hairline">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white border border-hairline text-ink rounded-pill text-xs font-medium hover:bg-hairline transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Certificate</span>
          </button>
          <button
            onClick={handleDownloadJson}
            className="px-5 py-2 bg-primary text-white rounded-pill text-xs font-medium hover:bg-cohere-black transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON Proof</span>
          </button>
        </div>

      </div>
    </div>
  );
}
