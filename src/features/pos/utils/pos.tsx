import { SaleRequestDto } from "@/features/sale/types/sale.dto";
import { StatusEnum } from "@/features/sale/types/sale";
import { PosState } from "../store/pos";
import { ItemRequestDto, UnitRequestItemDto, ServiceRequestItemDto } from "@/features/sale/types/item.dto";
import { convertDateToLocaleDate } from "@/lib/date";

export function convertPosStoreToSaleRequestDto
(posState: PosState, status: StatusEnum): SaleRequestDto {
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

  const items: ItemRequestDto[] = [
    ...unitItemList,
    ...serviceItemList
  ].map((i) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...item } = i;
    return item;
  });

  return {
    userId: '362444bf-734d-4854-abc1-c20dbeab55bf',
    dueDate: convertDateToLocaleDate(posState.dueDate),
    created: convertDateToLocaleDate(new Date()),
    discount: posState.discount,
    vehicleId: posState.vehicle.id || '',
    customerId: posState.customer.id || '',
    status,
    items
  };
}