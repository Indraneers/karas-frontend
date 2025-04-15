import { ProductRequestDto } from "@/features/product/types/product.dto";

export interface UnitRequestDto {
  id?: string;
  name: string;
  quantity: number;
  toBaseUnit: number | 1000;
  price: number;
  productId: string;
}

export interface UnitResponseDto {
  id?: string;
  name: string;
  quantity: number;
  toBaseUnit: number;
  price: number;
  product: ProductRequestDto;
  productImg: string;
  subcategory: string;
  subcategoryImg: string;
  category: string;
}