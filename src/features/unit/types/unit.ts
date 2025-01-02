import { Product } from "../../product/types/product";

export interface Unit {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product: Product;
  toBaseUnit: number;
  sku: string;
}