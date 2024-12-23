import { request } from "@/lib/request";
import { CustomerDto } from "../types/customer.dto";

export const getAllCustomers = (): Promise<CustomerDto[]> => 
  request({
    url: '/customers',
    method: 'GET'
  });

export const createCustomer = (customerDto: CustomerDto): Promise<CustomerDto> => 
  request({
    url: '/customers',
    method: 'POST',
    data: customerDto
  });

export const deleteCustomer = (id: string): Promise<CustomerDto> =>
  request({
    url: '/customers/' + id,
    method: 'DELETE'
  });