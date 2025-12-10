import React from 'react';
import { TradeLog } from '../types';
import { ClipboardList, ArrowUpCircle, ArrowDownCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface TradingLogProps {
  logs: TradeLog[];
}

export const TradingLog: React.FC<TradingLogProps> = ({ logs }) => {
  
  const getActionBadge = (action: string) => {
    switch (action) {
      case 'BUY':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400"><ArrowUpCircle size={12} className="mr-1" /> BUY</span>;
      case 'SELL':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-rose-500/10 text-rose-400"><ArrowDownCircle size={12} className="mr-1" /> SELL</span>;
      case 'TICK_UPDATE':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-500/10 text-blue-400"><RefreshCw size={12} className="mr-1" /> UPDATE</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-700 text-slate-300"><AlertCircle size={12} className="mr-1" /> {action}</span>;
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700/50 shadow-lg overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-slate-700/50 flex items-center">
        <ClipboardList className="text-slate-400 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-slate-100">Execution Log</h2>
      </div>
      
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-slate-800 z-10 shadow-sm">
            <tr className="text-xs uppercase text-slate-500 font-semibold tracking-wider border-b border-slate-700/50">
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Ticker</th>
              <th className="px-6 py-3">Action</th>
              <th className="px-6 py-3 text-right">Price</th>
              <th className="px-6 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-3 text-xs text-slate-400 whitespace-nowrap">
                    {new Date(log.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 font-bold text-slate-200 text-sm">
                    {log.ticker}
                  </td>
                  <td className="px-6 py-3">
                    {getActionBadge(log.action)}
                  </td>
                  <td className="px-6 py-3 text-right font-mono text-sm text-slate-300">
                    {log.price ? `$${log.price.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-6 py-3 text-xs text-slate-400 max-w-xs truncate" title={log.note}>
                    {log.note}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No activity recorded today.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};