import { request } from "@/lib/request";
import { CustomerDto } from "../types/customer.dto";
import { Page } from "@/types/page";
import { APIQuery } from "@/types/query";
import { SaleResponseDto } from "@/features/sale/types/sale.dto";

export const getCustomers = (query?: APIQuery): Promise<Page<CustomerDto>> => 
  request({
    url: '/customers',
    method: 'GET',
    params: query
  });

export const getCustomerById = (id: string): Promise<CustomerDto> => 
  request({
    url: '/customers/' + id,
    method: 'GET'
  });


export const getCustomerSales = (id: string, query: APIQuery): Promise<Page<SaleResponseDto>> => 
  request({
    url: '/customers/' + id + '/sales',
    method: 'GET',
    params: query
  });

export const getCustomerSalesThroughCustomerId = (customerId: string) => {
  return (query: APIQuery) => getCustomerSales(customerId, query);
};
  
export const createCustomer = (customerDto: CustomerDto): Promise<CustomerDto> => 
  request({
    url: '/customers',
    method: 'POST',
    data: customerDto
  });

export const updateCustomer = (id: string, customerDto: CustomerDto): Promise<CustomerDto> =>
  request({
    url: '/customers/' + id,
    method: 'PUT',
    data: customerDto
  });

export const deleteCustomer = (id: string): Promise<CustomerDto> =>
  request({
    url: '/customers/' + id,
    method: 'DELETE'
  });