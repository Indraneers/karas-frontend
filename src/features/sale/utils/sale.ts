import { ServiceSelectorItem } from "@/features/service-selector/types/service-selector-item";
import { ItemTypes, ServiceItem, UnitItem } from "../types/item";
import { ItemDtoTypes } from "../types/item.dto";
import { Sale, SaleDto } from "../types/sale";

export function convertSaleDtoToSale(saleDto: SaleDto): Sale {
  return {
    dueDate: saleDto.dueDate,
    created: saleDto.created,
    status: saleDto.status,
    discount: String(Math.ceil(saleDto.discount / 100)),
    userId: saleDto.userId,
    vehicleId: saleDto.vehicleId,
    customerId: saleDto.customerId,
    items: saleDto.items.map((i) => convertItemDtoToItem(i))
  };
}

export function convertItemDtoToItem(itemDto: ItemDtoTypes): ItemTypes {
  if (itemDto.type == 'service') {
    return {
      type: itemDto.type,
      id: itemDto.id,
      price: String(Math.ceil(itemDto.price / 100)),
      discount: String(Math.ceil(itemDto.discount / 100)),
      quantity: itemDto.quantity,
      serviceId: itemDto.serviceId
    };
  }

  return {
    type: itemDto.type,
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