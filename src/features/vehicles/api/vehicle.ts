import { request } from "@/lib/request";
import { VehicleDto } from "../dto/vehicle.dto";

interface VehicleQuery {
  q?: string
}

export const getVehicles = (query?: VehicleQuery): Promise<VehicleDto[]> =>
  request({
    url: '/vehicles',
    method: 'GET',
    params: query
  });

export const getVehicleById = (id: string): Promise<VehicleDto> =>
  request({
    url: '/vehicles/' + id,
    method: 'GET'
  });

export const createVehicle = (vehicleDto: VehicleDto): Promise<VehicleDto> =>
  request({
    url: '/vehicles',
    method: 'POST',
    data: vehicleDto
  });

export const updateVehicle = (id: string, vehicleDto: VehicleDto): Promise<VehicleDto> =>
  request({
    url: '/vehicles/' + id,
    method: 'PUT',
    data: vehicleDto
  });

export const deleteVehicle = (id: string): Promise<VehicleDto> =>
  request({
    url: '/vehicles/' + id,
    method: 'DELETE'
  });