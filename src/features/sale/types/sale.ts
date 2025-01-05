import { CustomerDto } from "@/features/customer/types/customer.dto";
import { VehicleDto } from "@/features/vehicles/dto/vehicle.dto";
import { UserDto } from "@/features/user/types/user.dto";
import { Item } from "./item";
import { Maintenance } from "@/features/maintenance/types/maintenance";

export enum StatusEnum {
  PAID = 'PAID',
  HOLD = 'HOLD'
}
export interface Sale {
  id?: string;
  dueDate: string;
  created: string;
  discount: number;
  user: UserDto;
  customer: CustomerDto;
  vehicle: VehicleDto;
  items: Item[];
  status: StatusEnum;
  maintenance: Maintenance;
}