import { request } from "@/lib/request";
import { SaleDto } from "../types/sale";

export const getSales = async(): Promise<SaleDto[]> =>
  request({
    url: '/sales',
    method: 'GET'
  });

export const createSale = async (saleDto: SaleDto): Promise<SaleDto>  =>
  request({
    url: '/sales',
    method: 'POST',
    data: saleDto
  });