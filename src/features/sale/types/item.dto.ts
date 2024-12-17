import { ServiceDto } from "@/features/service/types/service.dto";
import { UnitDto } from "@/features/unit/types/unit.dto";

export interface ItemDto {
  id?: string;
  price: number;
  quantity: number;
  discount: number;
}

export interface UnitItemDto extends ItemDto {
  type: 'unit';
  unit: UnitDto;
}

export interface ServiceItemDto extends ItemDto {
  type: 'service';
  service: ServiceDto;
}

export type ItemDtoTypes = UnitItemDto | ServiceItemDto;