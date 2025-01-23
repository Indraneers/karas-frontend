import { convertCurrencyToInputString, convertStringToCurrency } from "@/lib/currency";
import { ServiceForm } from "../components/service-form";
import { Service } from "../types/service";
import { ServiceDto } from "../types/service.dto";

export function convertServiceDtoToService(serviceDto: ServiceDto): Service {
  return {
    ...serviceDto
  };
}

export function convertServiceDtoToServiceForm(serviceDto: ServiceDto): ServiceForm {
  return {
    id: serviceDto.id,
    name: serviceDto.name,
    price: convertCurrencyToInputString(serviceDto.price),
    active: serviceDto.active
  };
}

export function convertServiceFormToServiceDto(serviceForm: ServiceForm): ServiceDto {
  return {
    id: serviceForm.id || '',
    name: serviceForm.name,
    price: convertStringToCurrency(serviceForm.price),
    active: serviceForm.active
  };
}