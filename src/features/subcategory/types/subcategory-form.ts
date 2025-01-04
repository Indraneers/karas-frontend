import { CategoryDto } from "@/features/category/types/category.dto";

export interface SubcategoryFormType {
  id: string;
  name: string;
  category: CategoryDto;
}