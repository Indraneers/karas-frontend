import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VehicleSelect } from "../vehicle-select";

interface CustomerVehicleForm {
  className?: string;
}

export function CustomerVehicleForm({ className = '' }: CustomerVehicleForm) {
  return (
    <div className={`grid grid-cols-3 gap-16 ${ className }`}>
      {/* Customer and Vehicle's note */}
      <div>
        {/* Customer name */}
        <div>
          <Label htmlFor="customer-name">
            Customer Name:
          </Label>
          <Input id="customer-name" className="mt-2" />
        </div>
        {/* Vehicle Note */}
        <div className="mt-3">
          <Label htmlFor="note">
            Leave a note:
          </Label>
          <Textarea placeholder="Type to leave a note..." id="note" className="mt-2" />
        </div>
      </div>
      {/* Vehicle Details */}
      <div>
        {/* VIN */}
        <div className="mt-3">
          <strong className="font-medium">VIN: </strong> 
          1HGCM82633A123456
        </div>

        {/* Make & Model */}
        <div className="flex items-center gap-2 mt-3">
          <Label className="font-medium">
            Make & Model:
          </Label>
          <VehicleSelect />
        </div>

        {/* Engine Number */}
        <div className="mt-3">
          <strong className="font-medium">Engine #: </strong> 
          20240831
        </div>

        {/* Plate Number */}
        <div className="mt-3">
          <strong className="font-medium">Plate Number: </strong> 
          6LLC123
        </div>

        {/* Mileage */}
        <div className="mt-3">
          <strong className="font-medium">Mileage: </strong> 
          125000 km
        </div>
      </div>
    </div>
  );
}