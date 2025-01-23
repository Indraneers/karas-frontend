import { request } from "@/lib/request";
import { UnitRequestDto, UnitResponseDto } from "../types/unit.dto";

interface UnitQuery {
  q?: string;
  productId?: string;
}

export const getUnits = async (query?: UnitQuery): Promise<UnitResponseDto[]>  =>
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

export const createUnit = async (unitDto: UnitRequestDto): Promise<UnitResponseDto> =>
  request({
    url: '/units',
    method: 'POST',
    data: unitDto
  });


export const updateUnit = async (unitId: string, unitDto: UnitRequestDto): Promise<UnitResponseDto> =>
  request({
    url: '/units/' + unitId,
    method: 'PUT',
    data: unitDto
  });

export const deleteUnit = async (unitId: string): Promise<UnitResponseDto> =>
  request({
    url: '/units/' + unitId,
    method: 'DELETE'
  });