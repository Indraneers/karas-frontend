import { RestockItemRequestDto } from "./restock-item.dto";

export interface RestockDto {
  id: string;
  items: RestockItemRequestDto[];
  userId: string;
  createdAt: Date;
}