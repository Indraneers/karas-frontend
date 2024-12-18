import { UnitDto } from "../types/unit.dto";
import { UnitForm } from "../components/unit-form";
import { convertCurrencyToString, convertStringToCurrency } from "@/lib/currency";
import { Unit } from "../types/unit";

export function convertUnitFormToUnitDto(unit: UnitForm): UnitDto {
  if (!unit.productId || unit?.product?.id) {
    throw new Error("TODO: ERROR");
  }
  return {
    name: unit.name,
    sku: unit.sku,
    quantity: unit.quantity,
    price: convertStringToCurrency(unit.price),
    productId: unit.productId || unit?.product?.id || ''
  };
}

export function convertUnitDtoToUnit(unit: UnitDto): Unit {
  if (!unit.productId || !unit.id) {
    throw new Error("TODO: ERROR");
  }
  return {
    id: unit.id,
    name: unit.name,
    sku: unit.sku,
    quantity: unit.quantity,
    price: unit.price,
    productId: unit.productId
  };
}

export function convertUnitDtoToUnitForm(unitDto: UnitDto): UnitForm {
  return {
    id: unitDto.id || '',
    name: unitDto.name,
    sku: unitDto.sku,
    quantity: unitDto.quantity,
    price: convertCurrencyToString(unitDto.price),
    productId: unitDto.productId
  };
}