import { Category } from "./category";
import { Unit } from "./unit";

export interface Product {
  id: string;
  name: string;
  category?: Category;
  categoryId: string;
  units?: Unit[];
}