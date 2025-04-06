import { CustomerDto } from "@/features/customer/types/customer.dto";
import { VehicleType } from "./vehicle";

export interface VehicleDto {
  id?: string;
  customer: CustomerDto;
  vinNo: string;
  engineNo: string;
  mileage: number;
  note: string;
  plateNumber: string;
  makeAndModel: string;
  vehicleType: VehicleType;
}