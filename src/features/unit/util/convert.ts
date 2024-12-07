import { Unit } from "@/types/unit";
import { UnitDto } from "../dto/unit.dto";

export function convertUnitToUnitDto(unit: Unit): UnitDto {
  if (!unit.productId || unit?.product?.id) {
    throw new Error("TODO: ERROR");
  }
  return {
    id: unit.id,
    name: unit.name,
    sku: unit.sku,
    quantity: unit.quantity,
    price: Math.floor(parseFloat(unit.price) * 100),
    productId: unit.productId || unit?.product?.id || ''
  };
}

export function convertUnitDtoToUnit(unitDto: UnitDto): Unit {
  return {
    id: unitDto.id,
    name: unitDto.name,
    sku: unitDto.sku,
    quantity: unitDto.quantity,
    price: (unitDto.price / 100).toFixed(2),
    productId: unitDto.productId
  };
}