/**
 * raw quantity: the quantity, whose errors is in the thousands, returned from the backend
 * base quantity: the smallest denomination of quantity for that unit
 * quantity: the quantity of the unit, taking the base quantity / conversion factor
 */
import { UnitResponseDto, UnitRequestDto } from "../types/unit.dto";
import { UnitForm } from "../components/unit-form";
import { Unit } from "../types/unit";
import { Item } from "@/features/sale/types/item";
import { RestockItem } from "@/features/restock/types/restock-item";

const UNIVERSAL_BASE_UNIT_QTY = 1000;

export function convertUnitFormToUnitDto(unit: UnitForm, variable: boolean): UnitRequestDto {
  if (!unit.productId) {
    throw new Error("TODO: ERROR");
  }

  if (variable) {
    return {
      name: unit.name,
      quantity: unit.quantity,
      price: unit.price,
      productId: unit.productId,
      toBaseUnit: unit.toBaseUnit
    };
  }

  return {
    name: unit.name,
    quantity: unit.quantity,
    price: unit.price,
    productId: unit.productId,
    toBaseUnit: unit.toBaseUnit
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
      quantity: unit.quantity,
      price: unit.price,
      product: unit.product,
      img: unit.img,
      subcategory: unit.subcategory,
      subcategoryImg: unit.subcategoryImg,
      category: unit.category,
      toBaseUnit: unit.toBaseUnit
    };
  }

  return {
    id: unit.id,
    name: unit.name,
    quantity: unit.quantity,
    price: unit.price,
    product: unit.product,
    img: unit.img,
    subcategory: unit.subcategory,
    subcategoryImg: unit.subcategoryImg,
    category: unit.category,
    toBaseUnit: unit.toBaseUnit
  };
}

export function convertUnitDtoToUnitForm(unitDto: UnitResponseDto): UnitForm {
  if (unitDto.product.baseUnit) {
    return {
      id: unitDto.id || '',
      name: unitDto.name,
      quantity: unitDto.quantity,
      price: unitDto.price,
      productId: unitDto.product.id,
      toBaseUnit: unitDto.toBaseUnit
    };
  }

  return {
    id: unitDto.id || '',
    name: unitDto.name,
    quantity: unitDto.quantity,
    price: unitDto.price,
    productId: unitDto.product.id,
    toBaseUnit: unitDto.toBaseUnit
  };
}

export function convertBaseQuantityToRawQuantity(baseUnit: number): number {
  return baseUnit * 1000;
}

export function convertRawQuantityToBaseQuantity(baseUnitDto: number): number {
  return baseUnitDto / 1000;
}

export function convertBaseQuantityToQuantity(toBaseUnit: number, baseUnitQuantity: number): number {
  return Math.trunc((baseUnitQuantity / toBaseUnit) * 1000) / 1000;
}

export function convertQuantityToBaseQuantity(toBaseUnit: number, quantity: number): number {
  return Math.trunc(quantity * toBaseUnit);
}

export function getQuantity(item: Item | RestockItem): number {
  const unit = item.unit;
  const product = unit.product;
  if (product.variable) {
    return convertBaseQuantityToDisplayQuantity(item.quantity);
  }

  return convertBaseQuantityToQuantity(unit.toBaseUnit, item.quantity);
}

export function convertBaseQuantityToDisplayQuantity(quantity: number): number {
  return Math.round(quantity / UNIVERSAL_BASE_UNIT_QTY * 1000) / 1000;
}