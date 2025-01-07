
import { ProductRequestDto, ProductResponseDto } from "../types/product.dto";

export function convertProductResponseDtoToProductRequestDto(productDto: ProductResponseDto): ProductRequestDto {
  return {
    id: productDto.id,
    baseUnit: productDto.baseUnit,
    name: productDto.name,
    unitCount: productDto.unitCount,
    variable: productDto.variable,
    subcategoryId: productDto.subcategory.id
  };
}
