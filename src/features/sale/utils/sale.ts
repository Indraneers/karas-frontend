import { ServiceSelectorItem } from "@/features/service-selector/types/service-selector-item";
import { ItemTypes, ServiceItem, UnitItem } from "../types/item";
import { ItemDtoTypes } from "../types/item.dto";
import { Sale, SaleResponseDto } from "../types/sale";

export function convertSaleResponseDtoToSale(saleResponseDto: SaleResponseDto): Sale {
  return {
    id: saleResponseDto.id,
    dueDate: saleResponseDto.dueDate,
    created: saleResponseDto.created,
    status: saleResponseDto.status,
    discount: String(Math.ceil(saleResponseDto.discount / 100)),
    user: saleResponseDto.user,
    vehicle: saleResponseDto.vehicle,
    customer: saleResponseDto.customer,
    items: saleResponseDto.items.map((i) => convertItemDtoToItem(i))
  };
}

export function convertItemDtoToItem(itemDto: ItemDtoTypes): ItemTypes {
  if ("serviceId" in itemDto) {
    return {
      type: 'service',
      id: itemDto.id,
      price: String(Math.ceil(itemDto.price / 100)),
      discount: String(Math.ceil(itemDto.discount / 100)),
      quantity: itemDto.quantity,
      serviceId: itemDto.serviceId
    };
  }

  return {
    type: 'unit',
    id: itemDto.id,
    price: String(Math.ceil(itemDto.price / 100)),
    discount: String(Math.ceil(itemDto.discount / 100)),
    quantity: itemDto.quantity,
    unitId: itemDto.unitId
  };
}

export function calculateTotalCost(price: string | number, discount: string | number, qty: string | number) {
  return ((
    (
      ((Number(price) * 100) || 0)
      -
      ((Number(discount) * 100) || 0)
    )
  *
  (Number(qty) || 0)
  ) / 100).toFixed(2);
}

export function getUnitsTotal(items: UnitItem[]): number {
  return items.reduce((prev, curr) => {
    const itemTotal = calculateTotalCost(curr.price, curr.discount, curr.quantity);
    return prev + Number(itemTotal);
  }, 0);
}

export function getServicesTotal(services: ServiceItem[] | ServiceSelectorItem[]): number {
  return services.reduce((prev, curr) => {
    const serviceTotal = calculateTotalCost(curr.price, curr.discount, '1');
    return prev + Number(serviceTotal);
  }, 0);
}

export function getSubtotal({ items, services }: { items: UnitItem[], services: ServiceItem[] | ServiceSelectorItem[]}) {
  return getUnitsTotal(items) + getServicesTotal(services);
}