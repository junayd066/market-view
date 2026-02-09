import { TIMEFRAMES } from "@/lib/deriv-markets";
import { cn } from "@/lib/utils";

interface TimeframeSelectorProps {
  value: number;
  onChange: (seconds: number) => void;
}

export function TimeframeSelector({ value, onChange }: TimeframeSelectorProps) {
  return (
    <div className="flex items-center gap-1">
      {TIMEFRAMES.map((tf) => (
        <button
          key={tf.seconds}
          onClick={() => onChange(tf.seconds)}
          className={cn(
            "px-3 py-1.5 rounded-md font-mono text-xs font-medium transition-all duration-200",
            value === tf.seconds
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          {tf.label}
        </button>
      ))}
    </div>
  );
}
