import { UnitRequestDto } from "@/features/unit/types/unit.dto";
import { StockUpdate } from "./stock-update.enum";

export interface RestockItemResponseDto {
  id: string;
  unit: UnitRequestDto;
  quantity: number;
  status: StockUpdate;
}

export interface RestockItemRequestDto {
  unitId: string;
  quantity: number;
  status: StockUpdate;
}