import { ServiceDto } from "@/features/service/types/service.dto";
import { UnitDto } from "@/features/unit/types/unit.dto";

export interface ItemRequestDto {
  price: number;
  quantity: number;
  discount: number;
}

export interface ItemResponseDto {
  id: string;
  price: number;
  quantity: number;
  discount: number;
}

export interface UnitRequestItemDto extends ItemRequestDto {
  type: 'unit';
  unitId?: string;
}

export interface UnitResponseItemDto extends ItemResponseDto {
  type: 'unit';
  unit: UnitDto;
}

export interface ServiceRequestItemDto extends ItemRequestDto {
  type: 'service';
  serviceId?: string;
}

export interface ServiceResponseItemDto extends ItemResponseDto {
  type: 'service';
  service: ServiceDto;
}

export type ItemRequestDtoTypes = UnitRequestItemDto | ServiceRequestItemDto;
export type ItemResponseDtoTypes = UnitResponseItemDto | ServiceResponseItemDto;