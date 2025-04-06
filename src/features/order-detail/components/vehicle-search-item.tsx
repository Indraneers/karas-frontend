import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import { VehicleDto } from "../../vehicle/types/vehicle.dto";
import { usePosStore } from "@/features/pos/store/pos";
import { VehicleIcon } from "@/features/vehicle/components/vehicle-icon";
import { vehicleTypeList } from "@/features/vehicle/utils/vehicle";

interface VehicleSearchItemProps {
  className?: string;
  vehicle: VehicleDto;
  setQ: (text: string) => void;
  setOpen: (o: boolean) => void;
}

export function VehicleSearchItem({ className, vehicle, setQ, setOpen }: VehicleSearchItemProps) {
  const { setVehicleAndCustomer } = usePosStore();

  function handleClick() {
    setVehicleAndCustomer(vehicle) ;
    setQ('');
    setOpen(false);
  }

  const vehicleIcon = vehicleTypeList.find(v => v.value === vehicle.vehicleType)?.icon || vehicleTypeList[0].icon;

  return (
    <div 
      onClick={handleClick}
      className={cn([
        'grid grid-cols-[auto,1fr] p-1 rounded-md gap-2 cursor-pointer items-center hover:bg-accent group hover:text-background',
        className
      ])}
    >
      <VehicleIcon className="w-8 h-8" iconClassName="w-6 h-6" icon={vehicleIcon} />
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow">
          <div className="font-medium text-sm">
            {vehicle.makeAndModel}
          </div>
          <div className="flex justify-between items-center group-hover:text-background text-xs">
            <div className="flex items-center text-foreground/50 group-hover:text-background">
              <div>
                {vehicle.plateNumber}
              </div>
              <Dot size={16} />
              <div>
                {vehicle.mileage} km
              </div>
            </div>
            <div className="font-medium">
              {vehicle.customer?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}