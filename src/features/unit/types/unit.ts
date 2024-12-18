import { Product } from "../../../types/product";

export interface Unit {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product?: Product;
  productId: string;
  sku: string;
}