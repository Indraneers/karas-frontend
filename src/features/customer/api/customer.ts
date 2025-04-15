import { request } from "@/lib/request";
import { CustomerDto } from "../types/customer.dto";
import { Page } from "@/types/page";
import { APIQuery } from "@/types/query";

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