import { ProductRequestDto, ProductResponseDto } from "../types/product.dto";

export function convertProductFormToProductRequestDto(productDto: ProductResponseDto): ProductRequestDto {
  return {
    ...productDto,
    subcategoryId: productDto.subcategory.id
  };
}