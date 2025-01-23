import { Category } from "@/features/category/types/category";

export interface Subcategory {
  id: string;
  name: string;
  category: Category;
  productCount: number;
}