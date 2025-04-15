import { VehicleDto } from "@/features/vehicle/types/vehicle.dto";

export function VehicleCell({ vehicle } : { vehicle: VehicleDto }) {
  return (
    <div>
      {vehicle.makeAndModel}
    </div>
  );
}