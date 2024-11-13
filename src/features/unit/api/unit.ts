import { request } from "@/lib/request";
import { Unit } from "@/types/unit";
import { UnitDto } from "../dto/unit.dto";

export const getUnits = async (): Promise<Unit[]>  =>
  request({
    url: '/units',
    method: 'GET'
  });

export const getUnitById = async (unitId: string): Promise<Unit>  =>
  request({
    url: '/units/' + unitId,
    method: 'GET'
  });

export const createUnit = async (unitDto: UnitDto): Promise<Unit> =>
  request({
    url: '/units',
    method: 'POST',
    data: unitDto
  });


export const updateUnit = async (unitId: string, unitDto: UnitDto): Promise<Unit> =>
  request({
    url: '/units/' + unitId,
    method: 'PUT',
    data: unitDto
  });

export const deleteUnit = async (unitId: string): Promise<Unit> =>
  request({
    url: '/units/' + unitId,
    method: 'DELETE'
  });