import { Product } from "./product";

export interface Unit {
  id: string;
  name: string;
  quantity: number;
  price: string;
  product?: Product;
  productId: string;
  sku: string;
}