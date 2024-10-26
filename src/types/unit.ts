import { Product } from "./product";

export interface Unit {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product?: Product;
  sku: string;
}