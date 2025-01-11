import { StockUpdate } from "./stock-update.enum";
import { Unit } from "@/features/unit/types/unit";

export interface RestockItem {
  id: string;
  unit: Unit;
  quantity: number;
  stockUpdate: StockUpdate;
}