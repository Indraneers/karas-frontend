import { UnitResponseDto } from "@/features/unit/types/unit.dto";

export interface ItemRequestDto {
  price: number;
  quantity: number;
  discount: number;
  unitId: string;
}

export interface ItemResponseDto {
  id: string;
  price: number;
  quantity: number;
  discount: number;
  unit: UnitResponseDto;
}