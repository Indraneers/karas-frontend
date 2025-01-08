import { ProductRequestDto } from "@/features/product/types/product.dto";

export interface Unit {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product: ProductRequestDto;
  toBaseUnit: number;
}