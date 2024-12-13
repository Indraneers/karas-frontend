import { ItemDto } from "./item";

export enum StatusEnum {
  PAID = 'PAID',
  UNPAID = 'UNPAID'
}

export interface SaleDto {
  dueDate: string;
  created: string;
  discount: number;
  userId: string;
  customerId: string;
  vehicleId: string;
  items: ItemDto[],
  status: StatusEnum
}