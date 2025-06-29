import { request } from "@/lib/request";
import { UnitRequestDto, UnitResponseDto } from "../types/unit.dto";
import { APIQuery } from "@/types/query";
import { Page } from "@/types/page";

interface UnitQuery extends APIQuery {
  productId?: string;
}

export const getUnits = async (query?: UnitQuery): Promise<Page<UnitResponseDto>>  =>
  request({
    url: '/units',
    method: 'GET',
    params: query
  });

export const getUnitById = async (unitId: string): Promise<UnitResponseDto>  =>
  request({
    url: '/units/' + unitId,
    method: 'GET'
  });

export const createUnit = async (unitDto: UnitRequestDto, file?: File): Promise<UnitResponseDto> => {
  const formData = new FormData();
  
  formData.append('data', new Blob([JSON.stringify(unitDto)], { type: 'application/json' }));

  if (file) {
    formData.append('file', file);
  }

  return request({
    url: '/units',
    method: 'POST',
    data: formData
  });
};


export const updateUnit = async (unitId: string, unitDto: UnitRequestDto, file?: File): Promise<UnitResponseDto> => {
  const formData = new FormData();
  
  formData.append('data', new Blob([JSON.stringify(unitDto)], { type: 'application/json' }));

  if (file) {
    formData.append('file', file);
  }

  return request({
    url: '/units/' + unitId,
    method: 'PUT',
    data: formData
  });
};

export const deleteUnit = async (unitId: string): Promise<UnitResponseDto> =>
  request({
    url: '/units/' + unitId,
    method: 'DELETE'
  });