import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ToBaseUnitSwitchProps {
  isBaseUnit: boolean;
  className?: string;
  onChange?: (state: boolean) => void;
  baseUnit: string;
}

export function ToBaseUnitSwitch({ isBaseUnit, baseUnit, onChange, className }: ToBaseUnitSwitchProps) {
  return (
    <div className={cn([
      "flex items-center gap-2 bg-background p-2 rounded-md",
      className
    ])}>
      <Switch checked={isBaseUnit} onCheckedChange={onChange} />
    To {baseUnit}
    </div>
  );
}