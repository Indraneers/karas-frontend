import { UnitResponseDto, UnitRequestDto } from "../types/unit.dto";
import { UnitForm } from "../components/unit-form";
import { convertCurrencyToString, convertStringToCurrency } from "@/lib/currency";
import { Unit } from "../types/unit";

export function convertUnitFormToUnitDto(unit: UnitForm): UnitRequestDto {
  if (!unit.product) {
    throw new Error("TODO: ERROR");
  }
  return {
    name: unit.name,
    sku: unit.sku,
    quantity: unit.quantity,
    price: convertStringToCurrency(unit.price),
    productId: unit.product.id,
    toBaseUnit: unit.toBaseUnit
  };
}

export function convertUnitDtoToUnit(unit: UnitResponseDto): Unit {
  if (!unit.product || !unit.id) {
    throw new Error("TODO: ERROR");
  }
  return {
    id: unit.id,
    name: unit.name,
    sku: unit.sku,
    quantity: unit.quantity,
    price: unit.price,
    product: unit.product,
    toBaseUnit: unit.toBaseUnit
  };
}

export function convertUnitDtoToUnitForm(unitDto: UnitResponseDto): UnitForm {
  return {
    id: unitDto.id || '',
    name: unitDto.name,
    sku: unitDto.sku,
    quantity: unitDto.quantity,
    price: convertCurrencyToString(unitDto.price),
    product: unitDto.product,
    toBaseUnit: unitDto.toBaseUnit
  };
}