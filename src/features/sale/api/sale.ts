import { request } from "@/lib/request";
import { SaleRequestDto, SaleResponseDto } from "../types/sale.dto";

export const getSales = async(): Promise<SaleResponseDto[]> =>
  request({
    url: '/sales',
    method: 'GET'
  });

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

export const deleteSale = async(id: string): Promise<SaleResponseDto> =>
  request({
    url: '/sales/' + id,
    method: 'DELETE'
  });