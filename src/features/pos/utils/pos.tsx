import { SaleRequestDto } from "@/features/sale/types/sale.dto";
import { StatusEnum } from "@/features/sale/types/sale";
import { PosState } from "../store/pos";
import { ItemRequestDto } from "@/features/sale/types/item.dto";
import { convertDateToLocaleDate } from "@/lib/date";

export function convertPosStoreToSaleRequestDto
(posState: PosState, status: StatusEnum, userId: string): SaleRequestDto {
  const items: ItemRequestDto[] = 
    posState.items.map((i) => ({
      type: 'unit',
      price: i.price,
      discount: i.discount,
      quantity: i.quantity,
      unitId: i.unit.id
    }));

  // const serviceItemList: ServiceRequestItemDto[] = 
  //   posState
  //     .services
  //     .filter((s) => s.checked)
  //     .map((s) => ({
  //       type: 'service',
  //       price: s.price,
  //       discount: s.discount,
  //       quantity: s.quantity,
  //       serviceId: s.service.id
  //     }));

  return {
    dueDate: convertDateToLocaleDate(posState.dueDate),
    created: convertDateToLocaleDate(new Date()),
    discount: posState.discount,
    vehicleId: posState.vehicle.id || '',
    customerId: posState.customer.id || '',
    status,
    userId,
    items
  };
}