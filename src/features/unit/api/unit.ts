import { request } from "@/lib/request";
import { Unit } from "@/types/unit";
import { UnitDto } from "../dto/unit.dto";

export const getUnits = async (): Promise<Unit[]>  =>
  request({
    url: '/units',
    method: 'GET'
  });

export const createUnit = async (unitDto: UnitDto): Promise<Unit> =>
  request({
    url: '/units',
    method: 'POST',
    data: unitDto
  });