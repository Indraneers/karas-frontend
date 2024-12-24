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
        'flex p-2 border rounded-md gap-3 cursor-pointer hover:bg-accent group hover:text-background',
        className
      ])}
    >
      <div className="place-content-center border-foreground group-hover:border-accent grid bg-blue-50 border border-blue-400 rounded h-full transition-all aspect-square">
        <Car size={32} className="group-hover:text-accent text-blue-400 text-foreground" strokeWidth={1} />
      </div>
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow justify-between">
          <div className="font-medium text-md">
            {vehicle.makeAndModel}
          </div>
          <div className="group-hover:text-background flex justify-between justify-self-end items-center text-xs">
            <div className="group-hover:text-background flex items-center text-foreground/50">
              <div>
                {vehicle.plateNumber}
              </div>
              <Dot />
              <div>
                {vehicle.mileage} km
              </div>
            </div>
            <div>
              {vehicle.customer?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}