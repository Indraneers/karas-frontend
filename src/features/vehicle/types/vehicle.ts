import { Customer } from "@/features/customer/types/customer";

export enum VehicleType {
  MOTORBIKE = 'MOTORBIKE',
  TUK_TUK = 'TUK_TUK',
  PASSENGER_CAR = 'PASSENGER_CAR',
  COMMERCIAL_VEHICLE = 'COMMERCIAL_VEHICLE',
  OTHER = 'OTHER',
  EMPTY = '-'
}

export interface Vehicle {
  id?: string;
  customer: Customer;
  vinNo: string;
  engineNo: string;
  mileage: number;
  note: string;
  plateNumber: string;
  makeAndModel: string;
  vehicleType: VehicleType;
}