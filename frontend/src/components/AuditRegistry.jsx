import React from 'react';
import { RefreshCw, ExternalLink, ShieldCheck } from 'lucide-react';

export default function AuditRegistry({ auditLogs, onRefresh, isRefreshing }) {
  return (
    <section id="audit-section" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-hairline">
        <div>
          <span className="mono-tag text-xs text-muted">STEP 05 // RESEARCH AUDIT TRAIL</span>
          <h3 className="text-2xl sm:text-4xl font-display font-normal text-cohere-black mt-1">
            On-Chain Provenance Registry
          </h3>
        </div>

        <button
          onClick={onRefresh}
          className="mt-4 sm:mt-0 text-xs font-mono text-action-blue flex items-center gap-1.5 hover:underline disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Smart Contract Logs</span>
        </button>
      </div>

      {/* Cohere Research-Table Styled List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-normal">
          <thead>
            <tr className="border-b border-hairline text-xs mono-tag text-muted">
              <th className="pb-3 font-medium">Record ID</th>
              <th className="pb-3 font-medium">SHA-256 Fingerprint</th>
              <th className="pb-3 font-medium">Source / Platform</th>
              <th className="pb-3 font-medium">Block Height</th>
              <th className="pb-3 font-medium">Similarity</th>
              <th className="pb-3 font-medium">Integrity Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-soft-stone/40 transition-colors">
                <td className="py-4 font-mono font-bold text-ink">#{log.id.toString().padStart(2, '0')}</td>
                <td className="py-4 font-mono text-xs text-slate truncate max-w-xs font-semibold" title={log.hash}>
                  {log.hash.slice(0, 16)}...{log.hash.slice(-8)}
                </td>
                <td className="py-4 text-ink font-medium">{log.source}</td>
                <td className="py-4 font-mono text-xs text-ink font-semibold">Block #{log.block}</td>
                <td className="py-4 font-mono text-xs text-deep-green font-bold">{log.similarity ? `${log.similarity}%` : '97.4%'}</td>
                <td className="py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-pale-green text-deep-green font-semibold border border-emerald-200">
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
