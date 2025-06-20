import { request } from "@/lib/request";
import { SaleRequestDto, SaleResponseDto } from "../types/sale.dto";
import { Page } from "@/types/page";
import { APIQuery } from "@/types/query";
import { convertDateToLocaleDate } from "@/lib/date";

export const getSales = async(saleQuery: APIQuery): Promise<Page<SaleResponseDto>> => {
  return request({
    url: '/sales',
    method: 'GET',
    params: {
      page: saleQuery.page,
      createdAtFrom: saleQuery.createdAtFrom ? convertDateToLocaleDate(saleQuery.createdAtFrom as Date) : undefined,
      createdAtTo: saleQuery.createdAtTo ? convertDateToLocaleDate(saleQuery.createdAtTo as Date) : undefined,
      customerId: saleQuery.customerId,
      status: saleQuery.status,
      paymentType: saleQuery.paymentType,
      vehicleId: saleQuery.vehicleId,
      userId: saleQuery.userId
    }
  });
};

export const getSaleById = async(id: string): Promise<SaleResponseDto> =>
  request({
    url: '/sales/' + id,
    method: 'GET'
  });

export const createSale = async (saleRequestDto: SaleRequestDto): Promise<SaleResponseDto>  =>
  request({
    url: '/sales',
    method: 'POST',
    data: saleRequestDto
  });

export const updateSale = async (saleRequestDto: SaleRequestDto): Promise<SaleResponseDto> =>
  request({
    url: '/sales/' + saleRequestDto.id,
    method: 'PUT' ,
    data: saleRequestDto
  });

export const paySale = async (id: string): Promise<SaleResponseDto> =>
  request({
    url: '/sales/pay/' + id,
    method: 'PUT' 
  });
    
export const deleteSale = async(id: string): Promise<SaleResponseDto> =>
  request({
    url: '/sales/' + id,
    method: 'DELETE'
  });