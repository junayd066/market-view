export interface Market {
  symbol: string;
  label: string;
  group: string;
}

export const MARKETS: Market[] = [
  // Volatility Indices
  { symbol: "R_10", label: "Volatility 10 Index", group: "Volatility Indices" },
  { symbol: "R_25", label: "Volatility 25 Index", group: "Volatility Indices" },
  { symbol: "R_50", label: "Volatility 50 Index", group: "Volatility Indices" },
  { symbol: "R_75", label: "Volatility 75 Index", group: "Volatility Indices" },
  { symbol: "R_100", label: "Volatility 100 Index", group: "Volatility Indices" },
  // Volatility Indices (1s)
  { symbol: "1HZ10V", label: "Volatility 10 (1s) Index", group: "Volatility Indices" },
  { symbol: "1HZ25V", label: "Volatility 25 (1s) Index", group: "Volatility Indices" },
  { symbol: "1HZ50V", label: "Volatility 50 (1s) Index", group: "Volatility Indices" },
  { symbol: "1HZ75V", label: "Volatility 75 (1s) Index", group: "Volatility Indices" },
  { symbol: "1HZ100V", label: "Volatility 100 (1s) Index", group: "Volatility Indices" },
  // Forex
  { symbol: "frxEURUSD", label: "EUR/USD", group: "Forex" },
  { symbol: "frxGBPUSD", label: "GBP/USD", group: "Forex" },
  { symbol: "frxUSDJPY", label: "USD/JPY", group: "Forex" },
  { symbol: "frxAUDUSD", label: "AUD/USD", group: "Forex" },
  { symbol: "frxUSDCAD", label: "USD/CAD", group: "Forex" },
  { symbol: "frxEURGBP", label: "EUR/GBP", group: "Forex" },
  // Crash/Boom
  { symbol: "BOOM300N", label: "Boom 300 Index", group: "Synthetic Indices" },
  { symbol: "BOOM500", label: "Boom 500 Index", group: "Synthetic Indices" },
  { symbol: "BOOM1000", label: "Boom 1000 Index", group: "Synthetic Indices" },
  { symbol: "CRASH300N", label: "Crash 300 Index", group: "Synthetic Indices" },
  { symbol: "CRASH500", label: "Crash 500 Index", group: "Synthetic Indices" },
  { symbol: "CRASH1000", label: "Crash 1000 Index", group: "Synthetic Indices" },
  // Step/Range
  { symbol: "stpRNG", label: "Step Index", group: "Synthetic Indices" },
  { symbol: "RDBULL", label: "Bull Market Index", group: "Synthetic Indices" },
  { symbol: "RDBEAR", label: "Bear Market Index", group: "Synthetic Indices" },
];

export interface Timeframe {
  label: string;
  seconds: number;
}

export const TIMEFRAMES: Timeframe[] = [
  { label: "1m", seconds: 60 },
  { label: "5m", seconds: 300 },
  { label: "15m", seconds: 900 },
  { label: "1h", seconds: 3600 },
];
