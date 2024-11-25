import { request } from "@/lib/request";
import { AutoService } from "@/types/auto-service";

export const getAutoServices = (): Promise<AutoService[]> =>
  request({
    url: '/auto-services',
    method: 'GET'
  });