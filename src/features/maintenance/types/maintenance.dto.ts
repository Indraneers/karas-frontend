import { MaintenanceService } from "./maintenance-service";

export interface MaintenanceDto {
  id: string;
  createdAt: string;
  saleId: string;
  vehicleId: string;
  mileage: number;
  note: string;
  services: MaintenanceService[];
}