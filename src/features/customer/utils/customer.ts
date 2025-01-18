import { Customer } from "../types/customer";
import { CustomerDto } from "../types/customer.dto";

export function convertCustomerDtoToCustomer(customerDto: CustomerDto): Customer {
  return {
    id: customerDto.id || '',
    name: customerDto.name,
    address: customerDto.address,
    contact: customerDto.contact,
    note: customerDto.note
  };
}

export function convertCustomerToCustomerDto(customer: Customer): CustomerDto {
  return {
    id: customer.id || '',
    name: customer.name,
    address: customer.address,
    contact: customer.contact,
    note: customer.note
  };
}