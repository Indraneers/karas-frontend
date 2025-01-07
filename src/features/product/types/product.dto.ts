import { SubcategoryRequestDto } from "@/features/subcategory/types/subcategory.dto";

export interface ProductRequestDto {
  id: string;
  name: string;
  subcategoryId: string;
  unitCount: number;
  variable: boolean;
  baseUnit: string;
}


export interface ProductResponseDto {
  id: string;
  name: string;
  subcategory: SubcategoryRequestDto;
  unitCount: number;
  variable: boolean;
  baseUnit: string;
  img?: string;
}