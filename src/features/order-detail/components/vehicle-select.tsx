import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePosStore } from "@/features/pos/store/pos";
import { getVehiclesByCustomerId } from "@/features/vehicles/api/vehicle";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface VehicleSelectProps {
  className?: string;
}

export function VehicleSelect({ className }: VehicleSelectProps) {
  const { vehicle, setVehicleAndCustomer, customer } = usePosStore();

  const { data } = useQuery({
    queryKey: ['vehicles-customer-', customer.id || ''],
    queryFn: () => getVehiclesByCustomerId(customer.id || ''),
    enabled: !!customer.id
  });

  return (
    <Select 
      value={vehicle.id} 
      disabled={!customer.id} 
      onValueChange={(id) => {
        const vehicle = data?.find(v => id === v.id);
        if (vehicle) {
          setVehicleAndCustomer(vehicle);
        }
      }}
    >
      <SelectTrigger className={cn([
        "w-[200px] h-6",
        className
      ])}>
        <SelectValue placeholder="Select Vehicles" />
      </SelectTrigger>
      <SelectContent>
        { !data && ''}
        {data && data.map((v) => (
          <SelectItem value={v.id || ''} key={v.id}>
            <div className="flex items-center gap-2">
              {v.makeAndModel} ({v.plateNumber})
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}