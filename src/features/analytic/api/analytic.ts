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

export const getTotalCustomerInAWeek = (): Promise<AnalyticDTO[]> =>
  request({
    url: '/analytics/customers/week',
    method: 'GET'
  });

export const getTotalCustomerInAMonth = (): Promise<AnalyticDTO[]> =>
  request({
    url: '/analytics/customers/month',
    method: 'GET'
  });

export const getTotalVehicleInAWeek = (): Promise<AnalyticDTO[]> =>
  request({
    url: '/analytics/vehicles/week',
    method: 'GET'
  });

export const getTotalVehicleInAMonth = (): Promise<AnalyticDTO[]> =>
  request({
    url: '/analytics/vehicles/month',
    method: 'GET'
  });