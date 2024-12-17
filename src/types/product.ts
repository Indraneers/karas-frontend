import { Category } from "./category";
import { Unit } from "../features/unit/types/unit";

export interface Product {
  id: string;
  name: string;
  category?: Category;
  categoryId: string;
  units?: Unit[];
}