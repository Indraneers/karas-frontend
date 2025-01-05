import { ServiceDto } from "@/features/service/types/service.dto";

export interface MaintenanceServiceDto {
  id: string;
  service: ServiceDto;
  price: number;
  discount: number;
}