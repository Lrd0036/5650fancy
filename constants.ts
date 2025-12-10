import { Position, TradeLog } from './types';

// Mock Data to initialize the "State" of the app
export const INITIAL_POSITIONS: Position[] = [
  { ticker: 'AAPL', name: 'Apple Inc.', quantity: 150, purchase_price: 175.50, current_price: 220.30, unrealized_pnl: 6720.00 },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', quantity: 50, purchase_price: 450.00, current_price: 890.15, unrealized_pnl: 22007.50 },
  { ticker: 'MSFT', name: 'Microsoft Corp.', quantity: 100, purchase_price: 320.00, current_price: 415.20, unrealized_pnl: 9520.00 },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', quantity: 80, purchase_price: 135.00, current_price: 172.50, unrealized_pnl: 3000.00 },
  { ticker: 'TSLA', name: 'Tesla Inc.', quantity: 200, purchase_price: 240.00, current_price: 175.40, unrealized_pnl: -12920.00 },
];

export const INITIAL_LOGS: TradeLog[] = [
  { id: '1', date: '2024-05-15 09:30:00', ticker: 'NVDA', action: 'BUY', quantity: 10, price: 880.50, note: 'Momentum entry based on AI signal.' },
  { id: '2', date: '2024-05-14 15:45:00', ticker: 'TSLA', action: 'SELL', quantity: 20, price: 178.00, note: 'Stop loss triggered to mitigate risk.' },
  { id: '3', date: '2024-05-14 10:15:00', ticker: 'AAPL', action: 'TICK_UPDATE', quantity: null, price: 219.00, note: 'Routine price verification.' },
  { id: '4', date: '2024-05-13 14:20:00', ticker: 'MSFT', action: 'BUY', quantity: 50, price: 410.00, note: 'Long-term accumulation strategy.' },
  { id: '5', date: '2024-05-12 11:00:00', ticker: 'GOOGL', action: 'STAY', quantity: null, price: null, note: 'Holding pattern awaiting earnings.' },
];
