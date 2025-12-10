import React from 'react';
import { 
  LayoutDashboard, 
  LineChart, 
  History, 
  Settings, 
  PieChart, 
  LogOut 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <div className="w-20 lg:w-64 fixed left-0 top-0 h-full bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-all duration-300">
      {/* Brand */}
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
        <div className="w-8 h-8 bg-trade-accent rounded flex items-center justify-center text-white font-bold text-xl">
          L
        </div>
        <span className="hidden lg:block ml-3 font-mono font-bold text-slate-100 tracking-wider">
          LRD TRADE
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-6 space-y-2 px-2">
        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <NavItem icon={<LineChart size={20} />} label="Market Analysis" />
        <NavItem icon={<PieChart size={20} />} label="Portfolio" />
        <NavItem icon={<History size={20} />} label="Trade Log" />
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <NavItem icon={<Settings size={20} />} label="Settings" />
        <NavItem icon={<LogOut size={20} />} label="Logout" danger />
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  danger?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, danger }) => {
  return (
    <button
      className={`
        w-full flex items-center justify-center lg:justify-start px-3 py-3 rounded-lg transition-colors group
        ${active ? 'bg-slate-800 text-trade-accent' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
        ${danger ? 'hover:text-trade-down' : ''}
      `}
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="hidden lg:block ml-3 font-medium text-sm">{label}</span>
    </button>
  );
};