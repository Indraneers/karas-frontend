import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ToBaseUnitSwitchProps {
  className?: string;
  onChange?: (state: boolean) => void;
  baseUnit: string;
}

export function ToBaseUnitSwitch({ baseUnit, onChange, className }: ToBaseUnitSwitchProps) {
  return (
    <div className={cn([
      "flex items-center gap-2 bg-background p-2 rounded-md",
      className
    ])}>
      <Switch onCheckedChange={onChange} />
    Convert to {baseUnit}
    </div>
  );
}