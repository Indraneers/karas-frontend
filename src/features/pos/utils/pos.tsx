import { SaleRequestDto } from "@/features/sale/types/sale.dto";
import { PaymentType, StatusEnum } from "@/features/sale/types/sale";
import { PosState } from "../store/pos";
import { ItemRequestDto } from "@/features/sale/types/item.dto";
import { MaintenanceDto } from "@/features/maintenance/types/maintenance.dto";

export function convertPosStoreToSaleRequestDto
(posState: PosState, status: StatusEnum, paymentType: PaymentType, userId: string): SaleRequestDto {
  const items: ItemRequestDto[] = 
    posState.items.map((i) => ({
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

  const maintenance: MaintenanceDto | undefined = 
  posState.maintenance.services.length > 0 ?
    {
      ...posState.maintenance,
      createdAt: posState.maintenance.createdAt.toISOString()
    }
    :
    undefined;

  return {
    id: '',
    dueAt: posState.dueAt.toISOString(),
    discount: posState.discount,
    vehicleId: posState.vehicle.id || '',
    customerId: posState.customer.id || '',
    maintenance,
    status,
    userId,
    items,
    paymentType
  };
}