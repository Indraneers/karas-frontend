export interface ItemDto {
  id?: string;
  price: number;
  quantity: number;
  discount: number;
}

export interface UnitItemDto extends ItemDto {
  type: 'unit';
  unitId: string;
}

export interface ServiceItemDto extends ItemDto {
  type: 'service';
  serviceId: string;
}

export type ItemDtoTypes = UnitItemDto | ServiceItemDto;