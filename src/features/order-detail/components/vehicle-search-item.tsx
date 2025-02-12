import { cn } from "@/lib/utils";
import { Car, Dot } from "lucide-react";
import { VehicleDto } from "../../vehicles/dto/vehicle.dto";
import { usePosStore } from "@/features/pos/store/pos";

interface VehicleSearchItemProps {
  className?: string;
  vehicle: VehicleDto;
  setQ: (text: string) => void
}

export function VehicleSearchItem({ className, vehicle, setQ }: VehicleSearchItemProps) {
  const { setVehicleAndCustomer } = usePosStore();

  function handleClick() {
    setVehicleAndCustomer(vehicle) ;
    setQ('');
  }

  return (
    <div 
      onClick={handleClick}
      className={cn([
        'grid grid-cols-[auto,1fr] p-1 rounded-md gap-2 cursor-pointer items-center hover:bg-accent group hover:text-background',
        className
      ])}
    >
      <div className="place-content-center grid bg-blue-50 p-1 border border-foreground group-hover:border-accent border-blue-400 rounded h-9 aspect-square transition-all">  
        <Car className="group-hover:text-accent text-blue-400 text-foreground" strokeWidth={1} />
      </div>
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow">
          <div className="font-medium text-sm">
            {vehicle.makeAndModel}
          </div>
          <div className="group-hover:text-background flex justify-between items-center text-xs">
            <div className="group-hover:text-background flex items-center text-foreground/50">
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