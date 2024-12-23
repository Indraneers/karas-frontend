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


export const deleteVehicle = (id: string): Promise<VehicleDto> =>
  request({
    url: '/vehicles/' + id,
    method: 'DELETE'
  });