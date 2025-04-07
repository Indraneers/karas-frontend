/**
 * raw quantity: the quantity, whose errors is in the thousands, returned from the backend
 * base quantity: the smallest denomination of quantity for that unit
 * quantity: the quantity of the unit, taking the base quantity / conversion factor
 */
import { UnitResponseDto, UnitRequestDto } from "../types/unit.dto";
import { UnitForm } from "../components/unit-form";
import { convertCurrencyStringToRawCurrency, convertRawCurrencyToCurrencyString } from "@/features/currency/utils/currency";
import { Unit } from "../types/unit";

export function convertUnitFormToUnitDto(unit: UnitForm, variable: boolean): UnitRequestDto {
  if (!unit.productId) {
    throw new Error("TODO: ERROR");
  }

  if (variable) {
    return {
      name: unit.name,
      quantity: convertBaseQuantityToRawQuantity(unit.quantity),
      price: convertCurrencyStringToRawCurrency(unit.price),
      productId: unit.productId,
      toBaseUnit: convertBaseQuantityToRawQuantity(unit.toBaseUnit)
    };
  }

  return {
    name: unit.name,
    quantity: unit.quantity,
    price: convertCurrencyStringToRawCurrency(unit.price),
    productId: unit.productId,
    toBaseUnit: convertBaseQuantityToRawQuantity(unit.toBaseUnit)
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
      quantity: convertRawQuantityToBaseQuantity(unit.quantity),
      price: unit.price,
      product: unit.product,
      productImg: unit.productImg,
      subcategory: unit.subcategory,
      subcategoryImg: unit.subcategoryImg,
      category: unit.category,
      toBaseUnit: convertRawQuantityToBaseQuantity(unit.toBaseUnit)
    };
  }

  return {
    id: unit.id,
    name: unit.name,
    quantity: unit.quantity,
    price: unit.price,
    product: unit.product,
    productImg: unit.productImg,
    subcategory: unit.subcategory,
    subcategoryImg: unit.subcategoryImg,
    category: unit.category,
    toBaseUnit: convertRawQuantityToBaseQuantity(unit.toBaseUnit)
  };
}

export function convertUnitDtoToUnitForm(unitDto: UnitResponseDto): UnitForm {
  if (unitDto.product.baseUnit) {
    return {
      id: unitDto.id || '',
      name: unitDto.name,
      quantity: convertRawQuantityToBaseQuantity(unitDto.quantity),
      price: convertRawCurrencyToCurrencyString(unitDto.price),
      productId: unitDto.product.id,
      toBaseUnit: convertRawQuantityToBaseQuantity(unitDto.toBaseUnit)
    };
  }

  return {
    id: unitDto.id || '',
    name: unitDto.name,
    quantity: unitDto.quantity,
    price: convertRawCurrencyToCurrencyString(unitDto.price),
    productId: unitDto.product.id,
    toBaseUnit: convertRawQuantityToBaseQuantity(unitDto.toBaseUnit)
  };
}

export function convertBaseQuantityToRawQuantity(baseUnit: number): number {
  return baseUnit * 1000;
}

export function convertRawQuantityToBaseQuantity(baseUnitDto: number): number {
  return baseUnitDto / 1000;
}

export function convertBaseQuantityToQuantity(toBaseUnit: number, baseUnitQuantity: number): number {
  return Math.round((baseUnitQuantity / toBaseUnit) * 1000)/1000;
}

export function convertQuantityToBaseQuantity(toBaseUnit: number, quantity: number): number {
  return Math.round((quantity * toBaseUnit) * 1000)/1000;
}