import { Unit } from "@/features/unit/types/unit";

export interface Item {
  id: string;
  price: number;
  quantity: number;
  discount: number;
  unit: Unit;
}