import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Sparkles, RefreshCw } from 'lucide-react';
import { ChartDataPoint } from '../types';
import { generateSimulatedChartData } from '../services/geminiService';
import { Position } from '../types';

interface ChartSectionProps {
  currentPositions: Position[];
  totalValue: number;
}

export const ChartSection: React.FC<ChartSectionProps> = ({ currentPositions, totalValue }) => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateSimulatedChartData(currentPositions, totalValue);
      setData(result);
    } catch (err) {
      setError("Failed to generate simulation.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700/50 shadow-lg p-6 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            Simulated Future Growth
            <span className="text-trade-gold text-xs px-2 py-0.5 bg-trade-gold/10 border border-trade-gold/20 rounded-full font-mono">
              AI PROJECTION
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Predictive analysis based on current holdings and market volatility parameters.
          </p>
        </div>
        
        <button 
          onClick={fetchData} 
          disabled={loading}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-trade-accent hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
        >
          {loading ? (
            <RefreshCw className="animate-spin mr-2 h-4 w-4" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {loading ? 'Simulating...' : 'Run Simulation'}
        </button>
      </div>

      <div className="h-[350px] w-full bg-slate-850/50 rounded-lg p-2 border border-slate-700/30">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#64748b', fontSize: 11 }} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => {
                  const d = new Date(val);
                  return `${d.getMonth() + 1}/${d.getDate()}`;
                }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 11 }} 
                tickLine={false} 
                axisLine={false}
                domain={['auto', 'auto']}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#334155', 
                  borderRadius: '8px',
                  color: '#e2e8f0'
                }}
                itemStyle={{ color: '#3b82f6' }}
                formatter={(value: number) => [formatCurrency(value), 'Portfolio Value']}
                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-500">
             {error ? error : "No data available"}
          </div>
        )}
      </div>
    </div>
  );
};