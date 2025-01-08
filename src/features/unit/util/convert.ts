import { UnitResponseDto, UnitRequestDto } from "../types/unit.dto";
import { UnitForm } from "../components/unit-form";
import { convertCurrencyToString, convertStringToCurrency } from "@/lib/currency";
import { Unit } from "../types/unit";

export function convertUnitFormToUnitDto(unit: UnitForm, variable: boolean): UnitRequestDto {
  if (!unit.productId) {
    throw new Error("TODO: ERROR");
  }

  if (variable) {
    return {
      name: unit.name,
      quantity: convertBaseUnitQuantityToBaseUnitQuantityDto(unit.quantity),
      price: convertStringToCurrency(unit.price),
      productId: unit.productId,
      toBaseUnit: convertBaseUnitQuantityToBaseUnitQuantityDto(unit.toBaseUnit)
    };
  }

  return {
    name: unit.name,
    quantity: unit.quantity,
    price: convertStringToCurrency(unit.price),
    productId: unit.productId,
    toBaseUnit: convertBaseUnitQuantityToBaseUnitQuantityDto(unit.toBaseUnit)
  };
}

export function convertUnitDtoToUnit(unit: UnitResponseDto): Unit {
  if (!unit.product || !unit.id) {
    throw new Error("TODO: ERROR");
  }

  if (unit.product.variable) {
    return {
      id: unit.id,
      name: unit.name,
      quantity: convertBaseUnitQuantityDtoToBaseUnitQuantity(unit.quantity),
      price: unit.price,
      product: unit.product,
      toBaseUnit: convertBaseUnitQuantityDtoToBaseUnitQuantity(unit.toBaseUnit)
    };
  }

  return {
    id: unit.id,
    name: unit.name,
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
      quantity: convertBaseUnitQuantityDtoToBaseUnitQuantity(unitDto.quantity),
      price: convertCurrencyToString(unitDto.price),
      productId: unitDto.product.id,
      toBaseUnit: convertBaseUnitQuantityDtoToBaseUnitQuantity(unitDto.toBaseUnit)
    };
  }

  return {
    id: unitDto.id || '',
    name: unitDto.name,
    quantity: unitDto.quantity,
    price: convertCurrencyToString(unitDto.price),
    productId: unitDto.product.id,
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