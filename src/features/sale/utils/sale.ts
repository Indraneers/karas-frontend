import { ServiceSelectorItem } from "@/features/service-selector/types/service-selector-item";
import { Item } from "../types/item";
import { ItemResponseDto } from "../types/item.dto";
import { Sale } from "../types/sale";
import {  SaleResponseDto } from "../types/sale.dto";
import { convertUnitDtoToUnit } from "@/features/unit/util/convert";

export function convertSaleResponseDtoToSale(saleResponseDto: SaleResponseDto): Sale {
  return {
    id: saleResponseDto.id,
    dueDate: saleResponseDto.dueDate,
    created: saleResponseDto.created,
    status: saleResponseDto.status,
    discount: saleResponseDto.discount,
    user: saleResponseDto.user,
    vehicle: saleResponseDto.vehicle,
    customer: saleResponseDto.customer,
    items: saleResponseDto.items.map((i) => convertItemDtoToItem(i))
  };
}


export function convertItemDtoToItem(itemDto: ItemResponseDto): Item {
  return {
    id: itemDto.id,
    price: itemDto.price,
    discount: itemDto.discount,
    quantity: itemDto.quantity,
    unit: convertUnitDtoToUnit(itemDto.unit)
  };
}

export function calculateTotalCost(price: number, discount: number, qty: number) {
  return (price - discount) * qty;
}

export function getUnitsTotal(items: Item[]): number {
  return items.reduce((prev, curr) => {
    const itemTotal = calculateTotalCost(curr.price, curr.discount, curr.quantity);
    return prev + itemTotal;
  }, 0);
}

export function getServicesTotal(services: ServiceSelectorItem[]): number {
  return services.reduce((prev, curr) => {
    const serviceTotal = calculateTotalCost(curr.price, curr.discount, 1);
    return prev + serviceTotal;
  }, 0);
}

// TODO: add maintenances
export function getSubtotal({ items }: { items: Item[]}) {
  return getUnitsTotal(items);
}

export function getTotal({ items, discount }: { items: Item[], discount: string | number}) {
  return  getUnitsTotal(items) - Number(discount);
}