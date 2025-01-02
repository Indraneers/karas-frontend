import { ProductDto } from "@/features/product/types/product.dto";

export interface UnitRequestDto {
  id?: string;
  name: string;
  sku: string;
  quantity: number;
  toBaseUnit: number;
  price: number;
  productId: string;
}

export interface UnitResponseDto {
  id?: string;
  name: string;
  sku: string;
  quantity: number;
  toBaseUnit: number;
  price: number;
  product: ProductDto;
}