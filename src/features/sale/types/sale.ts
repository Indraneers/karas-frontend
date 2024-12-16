import { CustomerDto } from "@/features/customer/types/customer.dto";
import { ItemTypes } from "./item";
import { ItemDto, ItemDtoTypes } from "./item.dto";
import { VehicleDto } from "@/features/vehicles/dto/vehicle.dto";
import { UserDto } from "@/features/user/types/user.dto";

export enum StatusEnum {
  PAID = 'PAID',
  UNPAID = 'UNPAID'
}

export interface SaleRequestDto {
  id?: string;
  dueDate: string;
  created: string;
  discount: number;
  userId: string;
  customerId: string;
  vehicleId: string;
  items: ItemDto[];
  status: StatusEnum
}

export interface SaleResponseDto {
  id?: string;
  dueDate: string;
  created: string;
  discount: number;
  user: UserDto;
  customer: CustomerDto;
  vehicle: VehicleDto;
  items: ItemDtoTypes[];
  status: StatusEnum
}

export interface Sale {
  id?: string;
  dueDate: string;
  created: string;
  discount: string;
  user: UserDto;
  customer: CustomerDto;
  vehicle: VehicleDto;
  items: ItemTypes[];
  status: StatusEnum;
}