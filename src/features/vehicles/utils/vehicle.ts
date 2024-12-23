import { convertCustomerDtoToCustomer, convertCustomerToCustomerDto } from "@/features/customer/utils/customer";
import { Vehicle } from "../dto/vehicle";
import { VehicleDto } from "../dto/vehicle.dto";

export function convertVehicleDtoToVehicle(vehicleDto: VehicleDto): Vehicle {
  return {
    id: vehicleDto.id || '',
    customer: convertCustomerDtoToCustomer(vehicleDto.customer),
    vinNo: vehicleDto.vinNo,
    engineNo: vehicleDto.engineNo,
    mileage: vehicleDto.mileage,
    plateNumber: vehicleDto.plateNumber,
    makeAndModel: vehicleDto.makeAndModel,
    note: vehicleDto.note
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
    note: vehicle.note
  };
}