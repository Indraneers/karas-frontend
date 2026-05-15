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
    <div className={cn("flex items-center justify-center text-muted-foreground", className)}>
      <Icon className={cn("w-4 h-4", iconClassName)} />
    </div>
  );
}