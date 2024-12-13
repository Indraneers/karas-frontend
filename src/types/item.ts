import { Product } from "./product";
import { Unit } from "./unit";

export interface Item {
  id?: string;
  price: string
  quantity: number;
  discount: string;
  unit: Unit;
  product?: Product;
}