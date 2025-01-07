
import { Unit } from "../../unit/types/unit";
import { SubcategoryRequestDto } from "@/features/subcategory/types/subcategory.dto";

export interface Product {
  id: string;
  name: string;
  subcategory: SubcategoryRequestDto;
  units?: Unit[];
  variable: boolean;
  baseUnit: string;
  img?: string;
}