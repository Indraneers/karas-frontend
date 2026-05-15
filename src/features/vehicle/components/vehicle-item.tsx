import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import { VehicleIcon } from "./vehicle-icon";
import { vehicleTypeList } from "@/features/vehicle/utils/vehicle";
import { VehicleDto } from "../types/vehicle.dto";

export function VehicleItem({ vehicle, className, showCustomer = true } : { vehicle: VehicleDto, className?: string, showCustomer?: boolean }) {
  const vehicleIcon = vehicleTypeList.find(v => v.value === vehicle.vehicleType)?.icon || vehicleTypeList[0].icon;
  return (
    <div
      className={cn(
        "group grid grid-cols-[auto_1fr] gap-2.5 items-center p-2 rounded-md cursor-pointer transition-colors hover:bg-muted/60",
        className
      )}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-sky-100/70 text-sky-700 shrink-0">
        <VehicleIcon className="size-5" iconClassName="size-4" icon={vehicleIcon} />
      </div>
      <div className="flex flex-col min-w-0">
        <div className="font-medium text-sm text-foreground truncate">
          {vehicle.makeAndModel}
        </div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center text-muted-foreground min-w-0">
            <span className="truncate">{vehicle.plateNumber}</span>
            <Dot size={16} className="shrink-0" />
            <span className="shrink-0">{vehicle.mileage} km</span>
          </div>
          {showCustomer && vehicle.customer?.name && (
            <div className="font-medium text-foreground/70 shrink-0">
              {vehicle.customer.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}