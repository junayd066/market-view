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
  // Forex Major Pairs
  { symbol: "frxEURUSD", label: "EUR/USD", group: "Forex" },
  { symbol: "frxGBPUSD", label: "GBP/USD", group: "Forex" },
  { symbol: "frxUSDJPY", label: "USD/JPY", group: "Forex" },
  { symbol: "frxAUDUSD", label: "AUD/USD", group: "Forex" },
  { symbol: "frxUSDCAD", label: "USD/CAD", group: "Forex" },
  { symbol: "frxEURGBP", label: "EUR/GBP", group: "Forex" },
  { symbol: "frxUSDCHF", label: "USD/CHF", group: "Forex" },
  { symbol: "frxNZDUSD", label: "NZD/USD", group: "Forex" },
  // Forex Minor/Cross Pairs
  { symbol: "frxEURJPY", label: "EUR/JPY", group: "Forex" },
  { symbol: "frxGBPJPY", label: "GBP/JPY", group: "Forex" },
  { symbol: "frxEURAUD", label: "EUR/AUD", group: "Forex" },
  { symbol: "frxGBPAUD", label: "GBP/AUD", group: "Forex" },
  { symbol: "frxAUDJPY", label: "AUD/JPY", group: "Forex" },
  { symbol: "frxCADJPY", label: "CAD/JPY", group: "Forex" },
  { symbol: "frxEURCAD", label: "EUR/CAD", group: "Forex" },
  { symbol: "frxGBPCAD", label: "GBP/CAD", group: "Forex" },
  { symbol: "frxEURNZD", label: "EUR/NZD", group: "Forex" },
  { symbol: "frxGBPNZD", label: "GBP/NZD", group: "Forex" },
  // Commodities
  { symbol: "frxXAUUSD", label: "Gold/USD", group: "Commodities" },
  { symbol: "frxXAGUSD", label: "Silver/USD", group: "Commodities" },
  { symbol: "frxXPTUSD", label: "Platinum/USD", group: "Commodities" },
  { symbol: "frxXPDUSD", label: "Palladium/USD", group: "Commodities" },
  // Cryptocurrencies
  { symbol: "cryBTCUSD", label: "BTC/USD", group: "Cryptocurrencies" },
  { symbol: "cryETHUSD", label: "ETH/USD", group: "Cryptocurrencies" },
  { symbol: "cryLTCUSD", label: "LTC/USD", group: "Cryptocurrencies" },
  // Crash/Boom
  { symbol: "BOOM300N", label: "Boom 300 Index", group: "Synthetic Indices" },
  { symbol: "BOOM500", label: "Boom 500 Index", group: "Synthetic Indices" },
  { symbol: "BOOM1000", label: "Boom 1000 Index", group: "Synthetic Indices" },
  { symbol: "CRASH300N", label: "Crash 300 Index", group: "Synthetic Indices" },
  { symbol: "CRASH500", label: "Crash 500 Index", group: "Synthetic Indices" },
  { symbol: "CRASH1000", label: "Crash 1000 Index", group: "Synthetic Indices" },
  // Jump Indices
  { symbol: "JD10", label: "Jump 10 Index", group: "Synthetic Indices" },
  { symbol: "JD25", label: "Jump 25 Index", group: "Synthetic Indices" },
  { symbol: "JD50", label: "Jump 50 Index", group: "Synthetic Indices" },
  { symbol: "JD75", label: "Jump 75 Index", group: "Synthetic Indices" },
  { symbol: "JD100", label: "Jump 100 Index", group: "Synthetic Indices" },
  // Step/Range/Drift
  { symbol: "stpRNG", label: "Step Index", group: "Synthetic Indices" },
  { symbol: "RDBULL", label: "Bull Market Index", group: "Synthetic Indices" },
  { symbol: "RDBEAR", label: "Bear Market Index", group: "Synthetic Indices" },
  // DEX Indices
  { symbol: "DEX600DN", label: "DEX 600DN", group: "Synthetic Indices" },
  { symbol: "DEX900DN", label: "DEX 900DN", group: "Synthetic Indices" },
  { symbol: "DEX1500DN", label: "DEX 1500DN", group: "Synthetic Indices" },
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
