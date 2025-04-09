import { Item } from "../types/item";
import { ItemResponseDto } from "../types/item.dto";
import { Sale } from "../types/sale";
import {  SaleResponseDto } from "../types/sale.dto";
import { convertBaseQuantityToQuantity, convertUnitDtoToUnit } from "@/features/unit/util/convert";
import { MaintenanceService } from "@/features/maintenance/types/maintenance-service";

export function convertSaleResponseDtoToSale(saleResponseDto: SaleResponseDto): Sale {
  return {
    id: saleResponseDto.id,
    dueAt: saleResponseDto.dueAt,
    createdAt: saleResponseDto.createdAt,
    status: saleResponseDto.status,
    discount: saleResponseDto.discount,
    user: saleResponseDto.user,
    vehicle: saleResponseDto.vehicle,
    customer: saleResponseDto.customer,
    items: saleResponseDto.items.map((i) => convertItemDtoToItem(i)),
    maintenance: saleResponseDto.maintenance ?
      {
        ...saleResponseDto.maintenance,
        createdAt: new Date(saleResponseDto.maintenance.createdAt)
      }
      :
      undefined
  };
}


export function convertItemDtoToItem(itemDto: ItemResponseDto): Item {
  if (itemDto.unit.product.variable) {
    return {
      id: itemDto.id,
      price: itemDto.price,
      discount: itemDto.discount,
      quantity: itemDto.quantity,
      unit: convertUnitDtoToUnit(itemDto.unit)
    };
  }

  return {
    id: itemDto.id,
    price: itemDto.price,
    discount: itemDto.discount,
    quantity: itemDto.quantity,
    unit: convertUnitDtoToUnit(itemDto.unit)
  };
}

export function calculateUnitItemTotalCost(price: number, discount: number, qty: number, toBaseUnit: number) {
  return calculateTotalCost(
    price,
    discount,
    convertBaseQuantityToQuantity(toBaseUnit, qty)
  );
}

export function calculateServiceItemTotalCost(price: number, discount: number) {
  return calculateTotalCost(
    price,
    discount,
    1
  );
}

export function calculateTotalCost(price: number, discount: number, qty: number) {
  return (price - discount) * qty;
}

export function getUnitsTotal(items: Item[]): number {
  return items.reduce((prev, curr) => {
    const unit = curr.unit;
    const itemTotal = calculateUnitItemTotalCost(curr.price, curr.discount, curr.quantity, unit.toBaseUnit);
    return prev + itemTotal;
  }, 0);
}

export function getServicesTotal(services: MaintenanceService[]): number {
  return services.reduce((prev, curr) => {
    const serviceTotal = calculateTotalCost(curr.price, curr.discount, 1);
    return prev + serviceTotal;
  }, 0);
}

// TODO: add maintenances
export function getSubtotal({ items, maintenanceServices }: { items: Item[], maintenanceServices: MaintenanceService[] }) {
  console.log(items, getUnitsTotal(items));
  return getUnitsTotal(items) + getServicesTotal(maintenanceServices);
}

export function getTotal
({ items, maintenanceServices, discount }: { items: Item[], maintenanceServices: MaintenanceService[], discount: string | number}) {
  return  getUnitsTotal(items) + getServicesTotal(maintenanceServices) - Number(discount);
}