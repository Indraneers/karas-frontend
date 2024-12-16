import { request } from "@/lib/request";
import { SaleRequestDto, SaleResponseDto } from "../types/sale";

export const getSales = async(): Promise<SaleResponseDto[]> =>
  request({
    url: '/sales',
    method: 'GET'
  });

export const createSale = async (saleRequestDto: SaleRequestDto): Promise<SaleResponseDto>  =>
  request({
    url: '/sales',
    method: 'POST',
    data: saleRequestDto
  });