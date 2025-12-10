import React from 'react';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  isCurrency?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon,
  isCurrency 
}) => {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700/50 shadow-lg hover:border-slate-600 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2 bg-slate-700/50 rounded-lg text-slate-300 group-hover:bg-slate-700 transition-colors">
          {icon || <Activity size={18} />}
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <h3 className={`text-2xl lg:text-3xl font-bold font-mono tracking-tight ${
          isCurrency && (isPositive ? 'text-trade-up' : isNegative ? 'text-trade-down' : 'text-white')
        }`}>
          {value}
        </h3>
      </div>

      {trend && (
        <div className="mt-3 flex items-center text-sm font-medium">
          {isPositive ? (
            <ArrowUpRight size={16} className="text-trade-up mr-1" />
          ) : isNegative ? (
            <ArrowDownRight size={16} className="text-trade-down mr-1" />
          ) : null}
          
          <span className={isPositive ? 'text-trade-up' : isNegative ? 'text-trade-down' : 'text-slate-400'}>
            {trendValue}
          </span>
          <span className="text-slate-500 ml-2 text-xs font-normal">vs last 24h</span>
        </div>
      )}
    </div>
  );
};