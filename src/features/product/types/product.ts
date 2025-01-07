
import { Unit } from "../../unit/types/unit";
import { SubcategoryRequestDto, SubcategoryResponseDto } from "@/features/subcategory/types/subcategory.dto";

export interface Product {
  id: string;
  name: string;
  subcategory: SubcategoryRequestDto;
  units?: Unit[];
  variable: boolean;
  baseUnit: string;
  img?: string;
}

export interface ProductFormType {
  id: string;
  name: string;
  subcategory: SubcategoryResponseDto;
  unitCount: number;
  variable: boolean;
  baseUnit: string;
  img?: string;
}