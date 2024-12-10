import { CustomerDto } from "@/features/customer/types/customer.dto";

export interface VehicleDto {
  id?: string;
  customer: CustomerDto;
  vinNo: string;
  engineNo: string;
  mileage: number;
  note: string;
  plateNumber: string;
  makeAndModel: string;
}