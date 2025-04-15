import { convertCustomerDtoToCustomer, convertCustomerToCustomerDto } from "@/features/customer/utils/customer";
import { Vehicle, VehicleType } from "../types/vehicle";
import { VehicleDto } from "../types/vehicle.dto";
import MotorbikeIcon from '../assets/motorbike.svg?react';
import TuktukIcon from '../assets/tuktuk.svg?react';
import { Car, Gauge, Truck } from "lucide-react";

export function convertVehicleDtoToVehicle(vehicleDto: VehicleDto): Vehicle {
  return {
    id: vehicleDto.id || '',
    customer: convertCustomerDtoToCustomer(vehicleDto.customer),
    vinNo: vehicleDto.vinNo,
    engineNo: vehicleDto.engineNo,
    mileage: vehicleDto.mileage,
    plateNumber: vehicleDto.plateNumber,
    makeAndModel: vehicleDto.makeAndModel,
    note: vehicleDto.note,
    vehicleType: vehicleDto.vehicleType
  };
}

export function convertVehicleToVehicleDto(vehicle: Vehicle): VehicleDto {
  return {
    id: vehicle.id || '',
    customer: convertCustomerToCustomerDto(vehicle.customer),
    vinNo: vehicle.vinNo,
    engineNo: vehicle.engineNo,
    mileage: vehicle.mileage,
    plateNumber: vehicle.plateNumber,
    makeAndModel: vehicle.makeAndModel,
    note: vehicle.note,
    vehicleType: vehicle.vehicleType
  };
}

export function getVehicleIcon(vehicleType: VehicleType): React.ReactNode {
  switch (vehicleType) {
  case VehicleType.MOTORBIKE:
    return <MotorbikeIcon />;
  case VehicleType.PASSENGER_CAR:
    return <Car />;
  case VehicleType.COMMERCIAL_VEHICLE:
    return <Truck />;
  case VehicleType.TUK_TUK:
    return <TuktukIcon />;
  default :
    return <Gauge />;
  }
}

export const vehicleTypeList = [
  {
    value: VehicleType.PASSENGER_CAR,
    content: "Passenger Car",
    icon: Car
  },
  {
    value: VehicleType.MOTORBIKE,
    content: "Motorbike",
    icon: MotorbikeIcon
  },
  {
    value: VehicleType.COMMERCIAL_VEHICLE,
    content: "Commercial Vehicle",
    icon: Truck
  },
  {
    value: VehicleType.TUK_TUK,
    content: "Tuktuk",
    icon: TuktukIcon
  },
  {
    value: VehicleType.OTHER,
    content: "Other",
    icon: Gauge
  }
];