import { Product } from "./product";
import { Unit } from "./unit";

export interface Item {
  price: string
  quantity: number;
  discount: string;
  unit: Unit;
  product?: Product;
}