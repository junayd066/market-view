import { MARKETS, type Market } from "@/lib/deriv-markets";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MarketSelectorProps {
  value: string;
  onChange: (symbol: string) => void;
}

const groups = [...new Set(MARKETS.map((m) => m.group))];

export function MarketSelector({ value, onChange }: MarketSelectorProps) {
  const selected = MARKETS.find((m) => m.symbol === value);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[220px] glass-panel border-border font-mono text-sm h-9">
        <SelectValue>{selected?.label ?? "Select market"}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-popover border-border max-h-[320px]">
        {groups.map((group) => (
          <SelectGroup key={group}>
            <SelectLabel className="text-muted-foreground text-xs font-semibold uppercase tracking-wider px-2">
              {group}
            </SelectLabel>
            {MARKETS.filter((m) => m.group === group).map((m) => (
              <SelectItem
                key={m.symbol}
                value={m.symbol}
                className="font-mono text-sm cursor-pointer"
              >
                {m.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
