import { request } from "@/lib/request";
import { AnalyticDTO } from "../type/analytic";

export const getTotalSaleInAWeek = (): Promise<AnalyticDTO[]> => 
  request({
    url: '/analytics/sales/week',
    method: 'GET'
  });

export const getTotalSaleInAMonth = (): Promise<AnalyticDTO[]> => 
  request({
    url: '/analytics/sales/month',
    method: 'GET'
  });
