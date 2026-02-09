import { useEffect, useRef, useCallback, useState } from "react";

const DERIV_WS_URL = "wss://ws.derivws.com/websockets/v3?app_id=1089";

export interface OHLCCandle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface DerivCandle {
  epoch: number;
  open: string;
  high: string;
  low: string;
  close: string;
}

interface UseDerivWebSocketOptions {
  symbol: string;
  granularity: number;
  onHistoryData: (candles: OHLCCandle[]) => void;
  onRealtimeCandle: (candle: OHLCCandle) => void;
  onPriceUpdate: (price: number, epoch: number) => void;
}

export function useDerivWebSocket({
  symbol,
  granularity,
  onHistoryData,
  onRealtimeCandle,
  onPriceUpdate,
}: UseDerivWebSocketOptions) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const subscriptionIdRef = useRef<string | null>(null);
  const callbacksRef = useRef({ onHistoryData, onRealtimeCandle, onPriceUpdate });

  callbacksRef.current = { onHistoryData, onRealtimeCandle, onPriceUpdate };

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.close();
    }

    setLoading(true);
    const ws = new WebSocket(DERIV_WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      // Request candle history
      const end = Math.floor(Date.now() / 1000);
      const count = 500;
      ws.send(
        JSON.stringify({
          ticks_history: symbol,
          adjust_start_time: 1,
          count,
          end: "latest",
          granularity,
          style: "candles",
          subscribe: 1,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.error) {
        console.warn("Deriv API error:", data.error.message);
        setLoading(false);
        return;
      }

      if (data.msg_type === "candles") {
        const candles: OHLCCandle[] = data.candles.map((c: DerivCandle) => ({
          time: c.epoch,
          open: parseFloat(c.open),
          high: parseFloat(c.high),
          low: parseFloat(c.low),
          close: parseFloat(c.close),
        }));
        callbacksRef.current.onHistoryData(candles);
        setLoading(false);
        if (data.subscription) {
          subscriptionIdRef.current = data.subscription.id;
        }
      }

      if (data.msg_type === "ohlc") {
        const c = data.ohlc;
        const candle: OHLCCandle = {
          time: parseInt(c.open_time),
          open: parseFloat(c.open),
          high: parseFloat(c.high),
          low: parseFloat(c.low),
          close: parseFloat(c.close),
        };
        callbacksRef.current.onRealtimeCandle(candle);
        callbacksRef.current.onPriceUpdate(parseFloat(c.close), parseInt(c.epoch));
      }
    };

    ws.onerror = () => {
      setConnected(false);
    };

    ws.onclose = () => {
      setConnected(false);
      // Auto-reconnect after 3 seconds
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, 3000);
    };
  }, [symbol, granularity]);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimeoutRef.current);
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  return { connected, loading };
}
