import { SaleDto, StatusEnum } from "@/features/sale/types/sale";
import { PosState } from "../store/pos";
import { ItemDto } from "@/features/sale/types/item";

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


export function convertPosStoreToSaleDto
(posState: PosState, dueDate: string, status: StatusEnum): SaleDto {
  const itemList: ItemDto[] = 
    posState.items.map((i) => ({
      price: Math.ceil(Number(i.price) * 100),
      discount: Math.ceil(Number(i.discount) * 100),
      quantity: Number(i.quantity),
      unitId: i.unit.id
    }));

  const serviceList: ItemDto[] = 
    posState
      .services
      .filter((s) => s.checked)
      .map((s) => ({
        price: Math.ceil(Number(s.price) * 100),
        discount: Math.ceil(Number(s.discount) * 100),
        quantity: Number(s.quantity),
        serviceId: s.autoService.id
      }));

  const items: ItemDto[] = [
    ...itemList,
    ...serviceList
  ];

  return {
    userId: 'fde1023e-3d87-49c4-8711-c2c04c1ce6d9',
    dueDate,
    created: new Date().toISOString().slice(0, -1),
    discount: posState.discount,
    vehicleId: posState.vehicle.id || '',
    customerId: posState.customer.id || '',
    status,
    items
  };
}