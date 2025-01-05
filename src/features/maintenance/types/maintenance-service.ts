import { Service } from "@/features/service/types/service";

export interface MaintenanceService {
  id: string;
  service: Service;
  price: number;
  discount: number;
}