import { cn } from "@/lib/utils";
import { InvoiceDetailElement } from "./invoice-detail-element";
import { VehicleDto } from "@/features/vehicle/types/vehicle.dto";

export function VehicleInfo({ vehicle, className }: { vehicle: VehicleDto, className?: string }) {
  return (
    <div className={cn("grid grid-cols-[90px_1fr] items-center gap-x-4", className)}>
      <h3 className="font-display text-sm font-medium text-neutral-900">Vehicle</h3>
      <div className="grid grid-cols-6 gap-x-4 gap-y-1">
        <InvoiceDetailElement className="col-span-2" label="Make and Model">
          <span className="font-medium">{vehicle.makeAndModel || "—"}</span>
        </InvoiceDetailElement>
        <InvoiceDetailElement label="Plate">
          <span className="font-medium">{vehicle.plateNumber || "—"}</span>
        </InvoiceDetailElement>
        <InvoiceDetailElement label="Mileage">
          {vehicle.mileage?.toLocaleString() || 0} km
        </InvoiceDetailElement>
        <InvoiceDetailElement label="VIN N.O">
          {vehicle.vinNo || "—"}
        </InvoiceDetailElement>
      </div>
    </div>
  );
}