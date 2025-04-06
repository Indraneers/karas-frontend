import { cn } from "@/lib/utils";
import { Car, Dot } from "lucide-react";
import { VehicleDto } from "../../vehicle/types/vehicle.dto";
import { usePosStore } from "@/features/pos/store/pos";

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

  return (
    <div 
      onClick={handleClick}
      className={cn([
        'grid grid-cols-[auto,1fr] p-1 rounded-md gap-2 cursor-pointer items-center hover:bg-accent group hover:text-background',
        className
      ])}
    >
      <div className="place-content-center grid bg-blue-50 p-1 border border-foreground group-hover:border-accent border-blue-400 rounded h-9 aspect-square transition-all">  
        <Car className="text-blue-400 text-foreground group-hover:text-accent" strokeWidth={1} />
      </div>
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