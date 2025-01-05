import { StatusEnum } from "./sale";
import { ItemRequestDto, ItemResponseDto } from "./item.dto";
import { UserDto } from "@/features/user/types/user.dto";
import { CustomerDto } from "@/features/customer/types/customer.dto";
import { VehicleDto } from "@/features/vehicles/dto/vehicle.dto";
import { MaintenanceDto } from "@/features/maintenance/types/maintenance.dto";

export interface SaleRequestDto {
  id?: string;
  dueDate: string;
  created: string;
  discount: number;
  userId: string;
  customerId: string;
  vehicleId: string;
  items: ItemRequestDto[];
  status: StatusEnum
  maintenance: MaintenanceDto;
}

export interface SaleResponseDto {
  id?: string;
  dueDate: string;
  created: string;
  discount: number;
  user: UserDto;
  customer: CustomerDto;
  vehicle: VehicleDto;
  items: ItemResponseDto[];
  status: StatusEnum;
  maintenance: MaintenanceDto;
}
