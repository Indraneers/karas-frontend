import { CustomerDto } from "@/features/customer/types/customer.dto";
import { VehicleDto } from "@/features/vehicle/types/vehicle.dto";
import { UserDto } from "@/features/user/types/user.dto";
import { Item } from "./item";
import { Maintenance } from "@/features/maintenance/types/maintenance";

export enum StatusEnum {
  PAID = 'PAID',
  HOLD = 'HOLD'
}

export enum PaymentType {
  BANK = 'BANK',
  CASH = 'CASH'
}
export interface Sale {
  id?: string;
  dueAt: string;
  createdAt: string;
  discount: number;
  user: UserDto;
  customer: CustomerDto;
  vehicle: VehicleDto;
  items: Item[];
  status: StatusEnum;
  paymentType: PaymentType;
  maintenance?: Maintenance;
}