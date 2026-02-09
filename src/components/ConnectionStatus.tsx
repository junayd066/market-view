import { cn } from "@/lib/utils";
import { Wifi, WifiOff } from "lucide-react";

interface ConnectionStatusProps {
  connected: boolean;
}

export function ConnectionStatus({ connected }: ConnectionStatusProps) {
  return (
    <div className={cn(
      "flex items-center gap-1.5 text-xs font-mono",
      connected ? "text-bull" : "text-bear"
    )}>
      {connected ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
      <span className="hidden sm:inline">{connected ? "Live" : "Reconnecting..."}</span>
    </div>
  );
}
