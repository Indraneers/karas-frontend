import { Category } from "../../../types/category";
import { Unit } from "../../unit/types/unit";

export interface Product {
  id: string;
  name: string;
  category?: Category;
  categoryId: string;
  units?: Unit[];
  variable: boolean;
  baseUnit: string;
}