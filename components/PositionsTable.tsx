import React from 'react';
import { Position } from '../types';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

interface PositionsTableProps {
  positions: Position[];
}

export const PositionsTable: React.FC<PositionsTableProps> = ({ positions }) => {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700/50 shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700/50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-100">Active Positions</h2>
        <button className="text-slate-400 hover:text-white transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-850/50 text-xs uppercase text-slate-500 font-semibold tracking-wider">
              <th className="px-6 py-4 rounded-tl-lg">Instrument</th>
              <th className="px-6 py-4 text-right">Qty</th>
              <th className="px-6 py-4 text-right">Avg Price</th>
              <th className="px-6 py-4 text-right">Last Price</th>
              <th className="px-6 py-4 text-right">Unrealized P&L</th>
              <th className="px-6 py-4 text-right rounded-tr-lg">% Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {positions.length > 0 ? (
              positions.map((pos) => {
                const isProfit = pos.unrealized_pnl >= 0;
                const percentChange = ((pos.current_price - pos.purchase_price) / pos.purchase_price) * 100;

                return (
                  <tr key={pos.ticker} className="group hover:bg-slate-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-200 text-sm">{pos.ticker}</span>
                        <span className="text-xs text-slate-500">{pos.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-sm text-slate-300 tabular-nums">
                      {pos.quantity.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-sm text-slate-300 tabular-nums">
                      ${pos.purchase_price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-sm font-medium text-slate-100 tabular-nums">
                      ${pos.current_price.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 text-right font-mono text-sm font-bold tabular-nums ${isProfit ? 'text-trade-up' : 'text-trade-down'}`}>
                      {isProfit ? '+' : ''}${Math.abs(pos.unrealized_pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isProfit 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {isProfit ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                        {Math.abs(percentChange).toFixed(2)}%
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  No active positions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};