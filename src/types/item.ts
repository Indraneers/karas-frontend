import { Product } from "./product";
import { Unit } from "./unit";

export interface Item {
  price: number;
  quantity: number;
  discount: number;
  unit: Unit;
  product?: Product;
}