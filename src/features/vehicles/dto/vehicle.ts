import { Customer } from "@/features/customer/types/customer";

export interface Vehicle {
  id?: string;
  customer?: Customer;
  vinNo: string;
  engineNo: string;
  mileage: number;
  note: string;
  plateNumber: string;
  makeAndModel: string;
}