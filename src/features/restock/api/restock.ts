import { request } from "@/lib/request";
import { RestockRequestDto, RestockResponseDto } from "../types/restock.dto";

export const createRestock = async (restockDto: RestockRequestDto): Promise<RestockResponseDto> =>
  request({
    url: '/restock',
    method: 'POST',
    data: restockDto
  });