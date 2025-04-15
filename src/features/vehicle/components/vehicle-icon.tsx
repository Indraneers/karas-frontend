import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

interface VehicleIcon {
  icon: 
    React.ComponentType<LucideProps>;
  className?: string;
  iconClassName?: string;
}

export function VehicleIcon({ icon: Icon, className, iconClassName } : VehicleIcon) {
  return (
    <div className={cn([
      "bg-accent p-1 rounded-sm",
      className
    ])}>
      <Icon className={cn([
        "w-4 h-4 text-white",
        iconClassName
      ])} />
    </div>
  );
}