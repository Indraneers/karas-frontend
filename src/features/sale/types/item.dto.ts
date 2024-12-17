import { ServiceDto } from "@/features/service/types/service.dto";
import { UnitDto } from "@/features/unit/types/unit.dto";

export interface ItemDto {
  id?: string;
  price: number;
  quantity: number;
  discount: number;
}

export interface UnitRequestItemDto extends ItemDto {
  type: 'unit';
  unitId?: string;
}

export interface UnitResponseItemDto extends ItemDto {
  type: 'unit';
  unit: UnitDto;
}

export interface ServiceRequestItemDto extends ItemDto {
  type: 'service';
  serviceId?: string;
}

export interface ServiceResponseItemDto extends ItemDto {
  type: 'service';
  service: ServiceDto;
}

export type ItemRequestDtoTypes = UnitRequestItemDto | ServiceRequestItemDto;
export type ItemResponseDtoTypes = UnitResponseItemDto | ServiceResponseItemDto;