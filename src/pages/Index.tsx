import { useState, useCallback, useRef } from "react";
import { TradingChart } from "@/components/TradingChart";
import { MarketSelector } from "@/components/MarketSelector";
import { TimeframeSelector } from "@/components/TimeframeSelector";
import { LivePrice } from "@/components/LivePrice";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { useDerivWebSocket, type OHLCCandle } from "@/hooks/use-deriv-websocket";
import { MARKETS } from "@/lib/deriv-markets";
import { Activity, Loader2 } from "lucide-react";

const Index = () => {
  const [symbol, setSymbol] = useState("R_100");
  const [granularity, setGranularity] = useState(60);
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const chartHandlersRef = useRef<{
    setData: (candles: OHLCCandle[]) => void;
    updateCandle: (candle: OHLCCandle) => void;
  } | null>(null);

  const handleHistoryData = useCallback((candles: OHLCCandle[]) => {
    chartHandlersRef.current?.setData(candles);
    if (candles.length > 0) {
      setLivePrice(candles[candles.length - 1].close);
    }
  }, []);

  const handleRealtimeCandle = useCallback((candle: OHLCCandle) => {
    chartHandlersRef.current?.updateCandle(candle);
  }, []);

  const handlePriceUpdate = useCallback((price: number) => {
    setLivePrice(price);
  }, []);

  const { connected, loading } = useDerivWebSocket({
    symbol,
    granularity,
    onHistoryData: handleHistoryData,
    onRealtimeCandle: handleRealtimeCandle,
    onPriceUpdate: handlePriceUpdate,
  });

  const handleChartReady = useCallback(
    (handlers: { setData: (candles: OHLCCandle[]) => void; updateCandle: (candle: OHLCCandle) => void }) => {
      chartHandlersRef.current = handlers;
    },
    []
  );

  const handleSymbolChange = (newSymbol: string) => {
    setLivePrice(null);
    setSymbol(newSymbol);
  };

  const selectedMarket = MARKETS.find((m) => m.symbol === symbol);

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-border glass-panel z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <span className="font-mono font-bold text-sm text-foreground tracking-tight hidden sm:inline">
              DerivChart
            </span>
          </div>
          <div className="w-px h-5 bg-border hidden sm:block" />
          <MarketSelector value={symbol} onChange={handleSymbolChange} />
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <LivePrice price={livePrice} symbol={symbol} />
          <div className="w-px h-5 bg-border" />
          <TimeframeSelector value={granularity} onChange={setGranularity} />
          <div className="w-px h-5 bg-border hidden sm:block" />
          <ConnectionStatus connected={connected} />
        </div>
      </header>

      {/* Chart Area */}
      <main className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/80">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <span className="font-mono text-xs text-muted-foreground">
                Loading {selectedMarket?.label}...
              </span>
            </div>
          </div>
        )}
        <TradingChart onChartReady={handleChartReady} />
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between px-4 py-1.5 border-t border-border text-muted-foreground">
        <span className="font-mono text-[10px]">
          {selectedMarket?.group} · {selectedMarket?.label}
        </span>
        <span className="font-mono text-[10px]">
          Powered by Deriv API · Observation Only
        </span>
      </footer>
    </div>
  );
};

export default Index;
