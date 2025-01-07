import { Subcategory } from "../types/subcategory";
import { SubcategoryFormType } from "../types/subcategory-form";
import { SubcategoryRequestDto, SubcategoryResponseDto } from "../types/subcategory.dto";

export function convertSCFormToSCDto(subcategoryForm: SubcategoryFormType): SubcategoryRequestDto {
  return {
    id: subcategoryForm.id,
    name: subcategoryForm.name,
    categoryId: subcategoryForm.category.id
  };
}

export function convertSCDtoToSC(subcategoryDto: SubcategoryResponseDto): Subcategory {
  console.log(subcategoryDto);
  return {
    ...subcategoryDto,
    productCount: subcategoryDto.productCount || 0,
    category: {
      ...subcategoryDto.category,
      subcategoryCount: subcategoryDto.category.subcategoryCount || 0
    }
  };
}