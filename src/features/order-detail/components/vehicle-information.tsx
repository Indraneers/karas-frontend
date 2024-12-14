import { OrderDetailElement } from "./order-detail-element";
import { Textarea } from "@/components/ui/textarea";
import { VehicleDto } from "@/features/vehicles/dto/vehicle.dto";

interface VehicleInformationProps {
  className?: string;
  vehicle: VehicleDto;
}

export function VehicleInformation({ className, vehicle }: VehicleInformationProps) {
  return (
    <div className={className}>
      <OrderDetailElement label="Make & Model">
        {vehicle.makeAndModel}
      </OrderDetailElement>
      <div className="gap-4 grid grid-cols-[3fr,2fr] mt-2">
        <div>
          <OrderDetailElement label="VIN N.O">
            {vehicle.vinNo}
          </OrderDetailElement>
          <OrderDetailElement label="Engine N.O" className="mt-2">
            {vehicle.engineNo}
          </OrderDetailElement>
        </div>
        <div className="self-start">
          <OrderDetailElement label="Plate Number">
            {vehicle.plateNumber}
          </OrderDetailElement>
          <OrderDetailElement label="Mileage" className="mt-2">
            {vehicle.mileage === 0 ? '-' : `${ vehicle.mileage } km`}
          </OrderDetailElement>
        </div>
      </div>
      <Textarea 
        className="mt-2 rounded-sm text-xs" 
        rows={1}
        placeholder="Add vehicle notes here..."
        defaultValue={vehicle.note}
      />
    </div>
  );
}