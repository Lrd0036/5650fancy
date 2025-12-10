export interface Position {
  ticker: string;
  quantity: number;
  purchase_price: number;
  current_price: number;
  unrealized_pnl: number;
  name: string; // Added for UI nicety
}

export interface TradeLog {
  id: string;
  date: string;
  ticker: string;
  action: 'BUY' | 'SELL' | 'STAY' | 'TICK_UPDATE';
  quantity: number | null;
  price: number | null;
  note: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  annotation?: string;
}

export interface PortfolioSummary {
  totalValue: number;
  totalPnL: number;
  positionCount: number;
  transactionCount: number;
}