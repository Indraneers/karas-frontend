import { CustomerDto } from "@/features/customer/types/customer.dto";
import { ItemTypes } from "./item";
import { VehicleDto } from "@/features/vehicles/dto/vehicle.dto";
import { UserDto } from "@/features/user/types/user.dto";

export enum StatusEnum {
  PAID = 'PAID',
  UNPAID = 'UNPAID'
}
export interface Sale {
  id?: string;
  dueDate: string;
  created: string;
  discount: number;
  user: UserDto;
  customer: CustomerDto;
  vehicle: VehicleDto;
  items: ItemTypes[];
  status: StatusEnum;
}