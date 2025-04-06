import { request } from "@/lib/request";
import { VehicleDto } from "../types/vehicle.dto";
import { APIQuery } from "@/types/query";
import { Page } from "@/types/page";

export const getVehicles = (q : APIQuery): Promise<Page<VehicleDto>> => 
  request({
    url: '/vehicles',
    method: 'GET',
    params: q
  });
export const getVehicleById = (id: string): Promise<VehicleDto> =>
  request({
    url: '/vehicles/' + id,
    method: 'GET'
  });

export const getVehiclesByCustomerId = (customerId: string): Promise<VehicleDto[]> =>
  request({
    url: `/customers/${ customerId }/vehicles`,
    method: 'GET'
  });

export const createVehicle = (vehicleDto: VehicleDto): Promise<VehicleDto> =>
  request({
    url: '/vehicles',
    method: 'POST',
    data: vehicleDto
  });

export const updateVehicle = (id: string, vehicleDto: VehicleDto): Promise<VehicleDto> => {
  console.log("CALLED", vehicleDto);
  return request({
    url: '/vehicles/' + id,
    method: 'PUT',
    data: vehicleDto
  });
};

export const deleteVehicle = (id: string): Promise<VehicleDto> =>
  request({
    url: '/vehicles/' + id,
    method: 'DELETE'
  });