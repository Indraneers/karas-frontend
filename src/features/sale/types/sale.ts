import { ItemTypes } from "./item";
import { ItemDtoTypes } from "./item.dto";

export enum StatusEnum {
  PAID = 'PAID',
  UNPAID = 'UNPAID'
}

export interface SaleDto {
  id?: string;
  dueDate: string;
  created: string;
  discount: number;
  userId: string;
  customerId: string;
  vehicleId: string;
  items: ItemDtoTypes[];
  status: StatusEnum
}

export interface Sale {
  id?: string;
  dueDate: string;
  created: string;
  discount: string;
  userId: string;
  customerId: string;
  vehicleId: string;
  items: ItemTypes[];
  status: StatusEnum;
}