import { UnitResponseDto, UnitRequestDto } from "../types/unit.dto";
import { UnitForm } from "../components/unit-form";
import { convertCurrencyToString, convertStringToCurrency } from "@/lib/currency";
import { Unit } from "../types/unit";

export function convertUnitFormToUnitDto(unit: UnitForm): UnitRequestDto {
  if (!unit.product) {
    throw new Error("TODO: ERROR");
  }

  if (unit.product.variable) {
    return {
      name: unit.name,
      sku: unit.sku,
      quantity: convertBaseUnitQuantityToBaseUnitQuantityDto(unit.quantity),
      price: convertStringToCurrency(unit.price),
      productId: unit.product.id,
      toBaseUnit: convertBaseUnitQuantityToBaseUnitQuantityDto(unit.toBaseUnit)
    };
  }

  return {
    name: unit.name,
    sku: unit.sku,
    quantity: unit.quantity,
    price: convertStringToCurrency(unit.price),
    productId: unit.product.id,
    toBaseUnit: convertBaseUnitQuantityToBaseUnitQuantityDto(unit.toBaseUnit)
  };
}

export function convertUnitDtoToUnit(unit: UnitResponseDto): Unit {
  if (!unit.product || !unit.id) {
    throw new Error("TODO: ERROR");
  }

  if (unit.product.variable) {
    console.log(unit.quantity, convertBaseUnitQuantityDtoToBaseUnitQuantity(unit.quantity));
    return {
      id: unit.id,
      name: unit.name,
      sku: unit.sku,
      quantity: convertBaseUnitQuantityDtoToBaseUnitQuantity(unit.quantity),
      price: unit.price,
      product: unit.product,
      toBaseUnit: convertBaseUnitQuantityDtoToBaseUnitQuantity(unit.toBaseUnit)
    };
  }

  return {
    id: unit.id,
    name: unit.name,
    sku: unit.sku,
    quantity: unit.quantity,
    price: unit.price,
    product: unit.product,
    toBaseUnit: convertBaseUnitQuantityDtoToBaseUnitQuantity(unit.toBaseUnit)
  };
}

export function convertUnitDtoToUnitForm(unitDto: UnitResponseDto): UnitForm {
  if (unitDto.product.baseUnit) {
    return {
      id: unitDto.id || '',
      name: unitDto.name,
      sku: unitDto.sku,
      quantity: convertBaseUnitQuantityDtoToBaseUnitQuantity(unitDto.quantity),
      price: convertCurrencyToString(unitDto.price),
      product: {
        ...unitDto.product,
        subcategory: {
          id: '',
          name: '',
          categoryId: '',
          productCount: 0
        }
      },
      toBaseUnit: convertBaseUnitQuantityDtoToBaseUnitQuantity(unitDto.toBaseUnit)
    };
  }

  return {
    id: unitDto.id || '',
    name: unitDto.name,
    sku: unitDto.sku,
    quantity: unitDto.quantity,
    price: convertCurrencyToString(unitDto.price),
    product: {
      ...unitDto.product,
      subcategory: {
        id: '',
        name: '',
        categoryId: '',
        productCount: 0
      }
    },
    toBaseUnit: convertBaseUnitQuantityDtoToBaseUnitQuantity(unitDto.toBaseUnit)
  };
}

export function convertBaseUnitQuantityToBaseUnitQuantityDto(baseUnit: number): number {
  return baseUnit * 1000;
}

export function convertBaseUnitQuantityDtoToBaseUnitQuantity(baseUnitDto: number): number {
  return baseUnitDto / 1000;
}

export function convertBaseUnitQuantityToQuantity(toBaseUnit: number, baseUnitQuantity: number): number {
  return Math.round((baseUnitQuantity / toBaseUnit) * 1000)/1000;
}

export function convertQuantityToBaseUnitQuantity(toBaseUnit: number, quantity: number): number {
  return Math.round((quantity * toBaseUnit) * 1000)/1000;
}