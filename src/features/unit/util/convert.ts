import { Unit } from "@/features/unit/types/unit";
import { UnitDto } from "../types/unit.dto";

export function convertUnitToUnitDto(unit: Unit): UnitDto {
  if (!unit.productId || unit?.product?.id) {
    throw new Error("TODO: ERROR");
  }
  console.log(Math.floor(parseFloat(unit.price) * 100));
  return {
    name: unit.name,
    sku: unit.sku,
    quantity: unit.quantity,
    price: Math.floor(parseFloat(unit.price) * 100),
    productId: unit.productId || unit?.product?.id || ''
  };
}

export function convertUnitDtoToUnit(unitDto: UnitDto): Unit {
  return {
    id: unitDto.id || '',
    name: unitDto.name,
    sku: unitDto.sku,
    quantity: unitDto.quantity,
    price: (unitDto.price / 100).toFixed(2),
    productId: unitDto.productId
  };
}