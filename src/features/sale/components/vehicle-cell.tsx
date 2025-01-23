import { VehicleDto } from "@/features/vehicles/dto/vehicle.dto";

export function VehicleCell({ vehicle } : { vehicle: VehicleDto }) {
  return (
    <div>
      {vehicle.makeAndModel}
    </div>
  );
}