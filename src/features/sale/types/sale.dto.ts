import { PaymentType, StatusEnum } from "./sale";
import { ItemRequestDto, ItemResponseDto } from "./item.dto";
import { UserDto } from "@/features/user/types/user.dto";
import { CustomerDto } from "@/features/customer/types/customer.dto";
import { VehicleDto } from "@/features/vehicle/types/vehicle.dto";
import { MaintenanceDto } from "@/features/maintenance/types/maintenance.dto";

export interface SaleRequestDto {
  id: string;
  dueAt: string;
  discount: number;
  userId: string;
  customerId: string;
  vehicleId: string;
  items: ItemRequestDto[];
  status: StatusEnum;
  paymentType: PaymentType;
  maintenance?: MaintenanceDto;
}

export interface SaleResponseDto {
  id: string;
  dueAt: string;
  createdAt: string;
  discount: number;
  user: UserDto;
  customer: CustomerDto;
  vehicle: VehicleDto;
  items: ItemResponseDto[];
  status: StatusEnum;
  paymentType: PaymentType;
  maintenance?: MaintenanceDto;
}
