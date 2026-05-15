import { request } from "@/lib/request";
import { AnalyticDTO, RevenueBreakdownDTO, TopProductDTO } from "../type/analytic";

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

export const getTopProducts = (days = 30, limit = 5): Promise<TopProductDTO[]> =>
  request({
    url: '/analytics/products/top',
    method: 'GET',
    params: { days, limit }
  });

export const getAverageOrderValue = (days = 30): Promise<AnalyticDTO[]> =>
  request({
    url: '/analytics/sales/aov',
    method: 'GET',
    params: { days }
  });

export const getTopCustomers = (days = 30, limit = 5): Promise<RevenueBreakdownDTO[]> =>
  request({
    url: '/analytics/customers/top',
    method: 'GET',
    params: { days, limit }
  });

export const getPaymentTypeBreakdown = (days = 30): Promise<RevenueBreakdownDTO[]> =>
  request({
    url: '/analytics/sales/payment-types',
    method: 'GET',
    params: { days }
  });

export const getRevenueByStaff = (days = 30, limit = 5): Promise<RevenueBreakdownDTO[]> =>
  request({
    url: '/analytics/staff/top',
    method: 'GET',
    params: { days, limit }
  });