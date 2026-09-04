import React from 'react';
import { RefreshCw, ExternalLink, ShieldCheck, Database } from 'lucide-react';

export default function AuditRegistry({ auditLogs, onRefresh, isRefreshing }) {
  return (
    <section id="audit-section" className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-zinc-200 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-zinc-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[11px] font-mono font-medium">AUDIT 10</span>
              <h3 className="text-lg font-semibold text-zinc-900">
                On-Chain Provenance Audit Trail
              </h3>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">Real-time immutable ledger of registered visual evidence on the local EVM node</p>
          </div>

          <button
            onClick={onRefresh}
            className="text-xs font-mono text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh EVM Logs</span>
          </button>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                <th className="py-2.5 px-3 font-medium">RECORD ID</th>
                <th className="py-2.5 px-3 font-medium">SHA-256 DIGEST</th>
                <th className="py-2.5 px-3 font-medium">SOURCE / PLATFORM</th>
                <th className="py-2.5 px-3 font-medium">BLOCK</th>
                <th className="py-2.5 px-3 font-medium">SIMILARITY</th>
                <th className="py-2.5 px-3 font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-zinc-900">#{log.id.toString().padStart(2, '0')}</td>
                  <td className="py-3 px-3 text-zinc-600 truncate max-w-xs font-medium" title={log.hash}>
                    {log.hash.slice(0, 16)}...{log.hash.slice(-8)}
                  </td>
                  <td className="py-3 px-3 text-zinc-800 font-sans font-medium">{log.source}</td>
                  <td className="py-3 px-3 text-zinc-600">Block #{log.block}</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">{log.similarity ? `${log.similarity}%` : '97.4%'}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

