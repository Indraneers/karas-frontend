import { ServiceSelectorItem } from "@/features/service-selector/types/service-selector-item";
import { ItemTypes, ServiceItem, UnitItem } from "../types/item";
import { ItemResponseDtoTypes, ServiceResponseItemDto, UnitResponseItemDto } from "../types/item.dto";
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

export function convertUnitItemDtoToUnitItem(unitItemDto: UnitResponseItemDto): UnitItem {
  return {
    type: 'unit',
    id: unitItemDto.id,
    price: unitItemDto.price,
    discount: unitItemDto.discount,
    quantity: unitItemDto.quantity,
    unitId: unitItemDto.unit.id,
    unit: convertUnitDtoToUnit(unitItemDto.unit)
  };
} 

export function convertServiceItemDtoToUnitItem(serviceItemDto: ServiceResponseItemDto): ServiceItem {
  return {
    type: 'service',
    id: serviceItemDto.id,
    price: serviceItemDto.price,
    discount: serviceItemDto.discount,
    quantity: serviceItemDto.quantity,
    serviceId: serviceItemDto.service.id,
    service: serviceItemDto.service
  };
}

export function convertItemDtoToItem(itemDto: ItemResponseDtoTypes): ItemTypes {
  if ("service" in itemDto && itemDto.service) {
    return {
      type: 'service',
      id: itemDto.id,
      price: itemDto.price,
      discount: itemDto.discount,
      quantity: itemDto.quantity,
      serviceId: itemDto.service.id,
      service: itemDto.service
    };
  }
  else if ("unit" in itemDto && itemDto.unit) {
    return {
      type: 'unit',
      id: itemDto.id,
      price: itemDto.price,
      discount: itemDto.discount,
      quantity: itemDto.quantity,
      unitId: itemDto.unit.id,
      unit: convertUnitDtoToUnit(itemDto.unit)
    };
  }

  return {
    type: 'unit',
    id: itemDto.id,
    price: itemDto.price,
    discount: itemDto.discount,
    quantity: itemDto.quantity
  };
}

export function calculateTotalCost(price: number, discount: number, qty: number) {
  return (price - discount) * qty;
}

export function getUnitsTotal(items: UnitItem[]): number {
  return items.reduce((prev, curr) => {
    const itemTotal = calculateTotalCost(curr.price, curr.discount, curr.quantity);
    return prev + itemTotal;
  }, 0);
}

export function getServicesTotal(services: ServiceItem[] | ServiceSelectorItem[]): number {
  return services.reduce((prev, curr) => {
    const serviceTotal = calculateTotalCost(curr.price, curr.discount, 1);
    return prev + serviceTotal;
  }, 0);
}

export function getSubtotal({ items, services }: { items: UnitItem[], services: ServiceItem[]}) {
  return getUnitsTotal(items) + getServicesTotal(services);
}

export function getTotal({ items, services, discount }: { items: UnitItem[], services: ServiceItem[], discount: string | number}) {
  return  getUnitsTotal(items) + getServicesTotal(services) - Number(discount);
}