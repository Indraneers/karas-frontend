import { Product } from "./product";

export interface Unit {
  name: string;
  quantity: number;
  price: number;
  product?: Product;
}