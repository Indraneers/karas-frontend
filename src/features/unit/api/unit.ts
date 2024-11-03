import { request } from "@/lib/request";
import { Unit } from "@/types/unit";

export const getUnits = async (): Promise<Unit[]>  =>
  request({
    url: '/units',
    method: 'GET'
  });