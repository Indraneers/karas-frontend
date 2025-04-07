import { SaleRequestDto } from "@/features/sale/types/sale.dto";
import { StatusEnum } from "@/features/sale/types/sale";
import { PosState } from "../store/pos";
import { ItemRequestDto } from "@/features/sale/types/item.dto";
import { convertDateToLocaleDate } from "@/lib/date";
import { convertBaseQuantityToRawQuantity } from "@/features/unit/util/convert";

export function convertPosStoreToSaleRequestDto
(posState: PosState, status: StatusEnum, userId: string): SaleRequestDto {
  const items: ItemRequestDto[] = 
    posState.items.map((i) => ({
      price: i.price,
      discount: i.discount,
      quantity: 
        i.unit.product.variable ?
          convertBaseQuantityToRawQuantity(i.quantity)
          :
          i.quantity,
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
    id: '',
    dueAt: convertDateToLocaleDate(posState.dueAt),
    createdAt: convertDateToLocaleDate(new Date()),
    discount: posState.discount,
    vehicleId: posState.vehicle.id || '',
    customerId: posState.customer.id || '',
    maintenance: {
      ...posState.maintenance,
      createdAt: convertDateToLocaleDate(posState.maintenance.createdAt)
    },
    status,
    userId,
    items
  };
}