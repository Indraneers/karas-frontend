import { Service } from "../types/service";
import { ServiceDto } from "../types/service.dto";

export function convertServiceDtoToService(serviceDto: ServiceDto): Service {
  return {
    ...serviceDto
  };
}