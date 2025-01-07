import { ProductFormType } from "../types/product";
import { ProductRequestDto, ProductResponseDto } from "../types/product.dto";

export function convertProductFormToProductRequestDto(productForm: ProductFormType): ProductRequestDto {
  return {
    id: productForm.id,
    baseUnit: productForm.baseUnit,
    name: productForm.name,
    unitCount: productForm.unitCount,
    variable: productForm.variable,
    subcategoryId: productForm.subcategory.id
  };
}

export function convertProductDtoToProductForm(productDto: ProductResponseDto): ProductFormType {
  const { subcategory } = productDto;
  return {
    id: productDto.id,
    baseUnit: productDto.baseUnit,
    name: productDto.name,
    unitCount: productDto.unitCount,
    variable: productDto.variable,
    subcategory: {
      id: subcategory.id,
      name: subcategory.name,
      category: {
        id: '',
        name: '',
        subcategoryCount: 0,
        img: ""
      },
      img: "",
      productCount: 0
    }
  };
}
