import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LivePriceProps {
  price: number | null;
  symbol: string;
}

export function LivePrice({ price, symbol }: LivePriceProps) {
  const prevPriceRef = useRef<number | null>(null);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (price !== null && prevPriceRef.current !== null) {
      if (price > prevPriceRef.current) setDirection("up");
      else if (price < prevPriceRef.current) setDirection("down");
    }
    prevPriceRef.current = price;
  }, [price]);

  if (price === null) return null;

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "w-2 h-2 rounded-full pulse-dot",
          direction === "up" ? "bg-bull" : direction === "down" ? "bg-bear" : "bg-primary"
        )}
      />
      <span
        className={cn(
          "font-mono text-lg font-bold tabular-nums transition-colors duration-200",
          direction === "up" && "price-up",
          direction === "down" && "price-down",
          !direction && "text-foreground"
        )}
      >
        {price.toFixed(symbol.startsWith("frx") ? 5 : 2)}
      </span>
    </div>
  );
}
