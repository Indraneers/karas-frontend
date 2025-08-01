import { ProductRequestDto } from "@/features/product/types/product.dto";

export interface Unit {
  id: string;
  name: string;
  quantity: number;
  price: number;
  product: ProductRequestDto;
  subcategory: string;
  subcategoryImg: string;
  category: string;
  toBaseUnit: number;
  img: string;
}