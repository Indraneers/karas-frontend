import { SaleRequestDto } from "@/features/sale/types/sale.dto";
import { StatusEnum } from "@/features/sale/types/sale";
import { PosState } from "../store/pos";
import { ItemDto, UnitRequestItemDto, ServiceRequestItemDto } from "@/features/sale/types/item.dto";

export function convertPosStoreToSaleRequestDto
(posState: PosState, dueDate: string, status: StatusEnum): SaleRequestDto {
  const unitItemList: UnitRequestItemDto[] = 
    posState.items.map((i) => ({
      type: 'unit',
      price: i.price,
      discount: i.discount,
      quantity: i.quantity,
      unitId: i.unit?.id || i.unitId || '' 
    }));

  const serviceItemList: ServiceRequestItemDto[] = 
    posState
      .services
      .filter((s) => s.checked)
      .map((s) => ({
        type: 'service',
        price: s.price,
        discount: s.discount,
        quantity: s.quantity,
        serviceId: s.service.id
      }));

  const items: ItemDto[] = [
    ...unitItemList,
    ...serviceItemList
  ].map((i) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...item } = i;
    return item;
  });

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