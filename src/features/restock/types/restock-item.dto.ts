import { UnitRequestDto } from "@/features/unit/types/unit.dto";
import { StockUpdate } from "./stock-update.enum";

export interface RestockItemResponseDto {
  id: string;
  unit: UnitRequestDto;
  quantity: number;
  stockUpdate: StockUpdate;
}

export interface RestockItemRequestDto {
  id: string;
  unitId: string;
  quantity: number;
  stockUpdate: StockUpdate;
}