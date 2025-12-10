import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { KPICard } from './components/KPICard';
import { ChartSection } from './components/ChartSection';
import { PositionsTable } from './components/PositionsTable';
import { TradingLog } from './components/TradingLog';
import { INITIAL_POSITIONS, INITIAL_LOGS } from './constants';
import { Wallet, TrendingUp, Layers, Activity } from 'lucide-react';

const App: React.FC = () => {
  // In a real app, these would come from an API or Websocket
  const [positions] = useState(INITIAL_POSITIONS);
  const [logs] = useState(INITIAL_LOGS);

  // Derived State Calculations
  const summary = useMemo(() => {
    let totalVal = 0;
    let totalUnrealized = 0;

    positions.forEach(p => {
      const val = p.quantity * p.current_price;
      totalVal += val;
      totalUnrealized += p.unrealized_pnl;
    });

    return {
      totalValue: totalVal,
      totalPnL: totalUnrealized,
      count: positions.length,
      txCount: logs.length
    };
  }, [positions, logs]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-trade-accent selection:text-white">
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="lg:ml-64 p-4 lg:p-8 transition-all duration-300">
        
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
              Dashboard
            </h1>
            <p className="text-slate-400 text-sm">
              Lance Reed Dye Trading Agent • <span className="text-emerald-400 font-mono">LIVE</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <div className="text-xs text-slate-500 uppercase font-bold">Market Status</div>
                <div className="text-emerald-400 text-sm font-bold flex items-center justify-end">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                   OPEN
                </div>
             </div>
          </div>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <KPICard 
            title="Total Portfolio Value"
            value={`$${summary.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            trend="up"
            trendValue="1.2%"
            isCurrency
            icon={<Wallet className="text-slate-300" size={20} />}
          />
          <KPICard 
            title="Unrealized P&L"
            value={`$${summary.totalPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            trend={summary.totalPnL >= 0 ? 'up' : 'down'}
            trendValue={summary.totalPnL >= 0 ? '4.5%' : '-1.2%'}
            isCurrency
            icon={<TrendingUp className="text-slate-300" size={20} />}
          />
          <KPICard 
            title="Active Positions"
            value={summary.count}
            icon={<Layers className="text-slate-300" size={20} />}
          />
          <KPICard 
            title="Total Transactions"
            value={summary.txCount}
            trend="neutral"
            trendValue="0"
            icon={<Activity className="text-slate-300" size={20} />}
          />
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          <ChartSection currentPositions={positions} totalValue={summary.totalValue} />
        </div>

        {/* Lower Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <PositionsTable positions={positions} />
          </div>
          <div className="xl:col-span-1">
            <TradingLog logs={logs} />
          </div>
        </div>

        <footer className="mt-12 border-t border-slate-800 pt-6 text-center text-slate-500 text-xs">
          <p>© 2024 Lance Reed Dye Trading Agent. Enterprise Deployment.</p>
          <p className="mt-1 font-mono">System ID: LRD-9981-X • Latency: 12ms</p>
        </footer>

      </main>
    </div>
  );
};

export default App;