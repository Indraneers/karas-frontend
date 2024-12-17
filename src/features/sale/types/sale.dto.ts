import { StatusEnum } from "./sale";
import {  ItemDto, ItemResponseDtoTypes } from "./item.dto";
import { UserDto } from "@/features/user/types/user.dto";
import { CustomerDto } from "@/features/customer/types/customer.dto";
import { VehicleDto } from "@/features/vehicles/dto/vehicle.dto";

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
  items: ItemResponseDtoTypes[];
  status: StatusEnum
}
