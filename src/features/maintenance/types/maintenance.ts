import { MaintenanceService } from "./maintenance-service";

export interface Maintenance {
  id: string;
  createdAt: Date;
  saleId: string;
  vehicleId: string;
  mileage: number;
  note: string;
  services: MaintenanceService[];
}