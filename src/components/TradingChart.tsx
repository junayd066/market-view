import { useEffect, useRef, useCallback } from "react";
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  ColorType,
  CrosshairMode,
  type CandlestickData,
  type Time,
} from "lightweight-charts";
import type { OHLCCandle } from "@/hooks/use-deriv-websocket";

interface TradingChartProps {
  onChartReady: (handlers: {
    setData: (candles: OHLCCandle[]) => void;
    updateCandle: (candle: OHLCCandle) => void;
  }) => void;
}

export function TradingChart({ onChartReady }: TradingChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const toChartData = (c: OHLCCandle): CandlestickData<Time> => ({
    time: c.time as Time,
    open: c.open,
    high: c.high,
    low: c.low,
    close: c.close,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "hsl(215, 12%, 50%)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "hsl(220, 14%, 10%)" },
        horzLines: { color: "hsl(220, 14%, 10%)" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: "hsl(215, 12%, 30%)", width: 1, style: 3, labelBackgroundColor: "hsl(220, 18%, 14%)" },
        horzLine: { color: "hsl(215, 12%, 30%)", width: 1, style: 3, labelBackgroundColor: "hsl(220, 18%, 14%)" },
      },
      rightPriceScale: {
        borderColor: "hsl(220, 14%, 14%)",
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderColor: "hsl(220, 14%, 14%)",
        timeVisible: true,
        secondsVisible: false,
      },
      handleScale: { axisPressedMouseMove: true },
      handleScroll: { mouseWheel: true, pressedMouseMove: true },
    });

    const series = chart.addCandlestickSeries({
      upColor: "hsl(142, 60%, 50%)",
      downColor: "hsl(0, 72%, 55%)",
      borderUpColor: "hsl(142, 60%, 50%)",
      borderDownColor: "hsl(0, 72%, 55%)",
      wickUpColor: "hsl(142, 60%, 45%)",
      wickDownColor: "hsl(0, 72%, 50%)",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);
    handleResize();

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    onChartReady({
      setData: (candles: OHLCCandle[]) => {
        if (seriesRef.current) {
          seriesRef.current.setData(candles.map(toChartData));
          chartRef.current?.timeScale().fitContent();
        }
      },
      updateCandle: (candle: OHLCCandle) => {
        if (seriesRef.current) {
          seriesRef.current.update(toChartData(candle));
        }
      },
    });
  }, [onChartReady]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full chart-container rounded-lg"
    />
  );
}
