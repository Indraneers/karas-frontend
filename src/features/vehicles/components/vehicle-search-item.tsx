import { cn } from "@/lib/utils";
import { Car, Dot } from "lucide-react";
import { VehicleDto } from "../dto/vehicle.dto";
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
        'flex border p-2 rounded-md gap-3 cursor-pointer hover:bg-accent group hover:text-background',
        className
      ])}
    >
      <div className="place-content-center border-foreground group-hover:border-accent grid bg-blue-50 border rounded transition-all aspect-square">
        <Car size={32} className="group-hover:text-accent text-foreground" strokeWidth={1.5} />
      </div>
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow justify-between">
          <div className="font-medium text-lg">
            {vehicle.makeAndModel}
          </div>
          <div className="group-hover:text-background flex items-center text-foreground/50 text-sm">
            <div>
              {vehicle.plateNumber}
            </div>
            <Dot />
            <div>
              {vehicle.mileage} km
            </div>
          </div>
        </div>
        <div className="text-right justify-self-end font-medium self-end">
          {vehicle.customer.name}
        </div>
      </div>
    </div>
  );
}