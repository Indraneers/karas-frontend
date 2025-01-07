import { CategoryDto } from "@/features/category/types/category.dto";

export interface SubcategoryRequestDto {
  id: string;
  name: string;
  categoryId: string;
  productCount?: number;
}

export interface SubcategoryResponseDto {
  id: string;
  name: string;
  category: CategoryDto;
  productCount: number;
  img: string;
}