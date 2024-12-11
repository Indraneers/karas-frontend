import { Item } from "@/types/item";

enum StatusEnum {
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
  items: Item[],
  status: StatusEnum
}