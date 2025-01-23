import { request } from "@/lib/request";
import { ServiceDto } from "@/features/service/types/service.dto";

export const getAutoServices = (): Promise<ServiceDto[]> =>
  request({
    url: '/auto-services',
    method: 'GET'
  });

export const getAutoServiceById = (id: string): Promise<ServiceDto> =>
  request({
    url: '/auto-services/' + id,
    method: 'GET'
  });

export const createAutoService = (serviceDto: ServiceDto): Promise<ServiceDto> =>
  request({
    url: '/auto-services',
    method: 'POST',
    data: serviceDto
  });

export const updateAutoService = (id: string, serviceDto: ServiceDto): Promise<ServiceDto> =>
  request({
    url: '/auto-services/' + id,
    method: 'PUT',
    data: serviceDto
  });

export const deleteAutoService = (id: string): Promise<ServiceDto> =>
  request({
    url: '/auto-services/' + id,
    method: 'DELETE'
  });