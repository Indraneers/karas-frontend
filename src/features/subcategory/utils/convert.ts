import { Subcategory } from "../types/subcategory";
import { SubcategoryRequestDto, SubcategoryResponseDto } from "../types/subcategory.dto";

export function convertSCDtoToSC(subcategoryDto: SubcategoryResponseDto): Subcategory {

  return {
    id: subcategoryDto.id,
    name: subcategoryDto.name,
    productCount: subcategoryDto.productCount || 0,
    category: {
      ...subcategoryDto.category,
      subcategoryCount: subcategoryDto.category.subcategoryCount || 0
    }
  };
}

export function convertSCResponseDtoToSCRequestDto(
  scResponseDto: SubcategoryResponseDto
): SubcategoryRequestDto {
  return {
    id: scResponseDto.id,
    name: scResponseDto.name,
    categoryId: scResponseDto.category.id,
    color: scResponseDto.color
  };
}