import { convertCustomerDtoToCustomer, convertCustomerToCustomerDto } from "@/features/customer/utils/customer";
import { Vehicle, VehicleType } from "../types/vehicle";
import { VehicleDto } from "../types/vehicle.dto";
import MotorbikeIcon from '../assets/motorbike.svg';
import TuktukIcon from '../assets/tuktuk.svg';
import { Car, Truck } from "lucide-react";

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
    return <img className="w-4 h-4" src={MotorbikeIcon} />;
  case VehicleType.PASSENGER_CAR:
    return <Car />;
  case VehicleType.COMMERCIAL_VEHICLE:
    return <Truck />;
  case VehicleType.TUK_TUK:
    return <img className="w-4 h-4" src={TuktukIcon} />;
  }
}