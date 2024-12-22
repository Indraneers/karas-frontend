import { request } from "@/lib/request";
import { ServiceDto } from "@/features/service/types/service.dto";

export const getAutoServices = (): Promise<ServiceDto[]> =>
  request({
    url: '/auto-services',
    method: 'GET'
  });


export const deleteAutoServices = (id: string): Promise<ServiceDto> =>
  request({
    url: '/auto-services/' + id,
    method: 'DELETE'
  });