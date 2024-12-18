import { Service } from "@/features/service/types/service";
import { Product } from "@/types/product";
import { Unit } from "@/features/unit/types/unit";

export interface Item {
  id?: string;
  price: number;
  quantity: number;
  discount: number;
}

export interface UnitItem extends Item {
  type: 'unit',
  unitId?: string;
  unit?: Unit;
  productId?: string;
  product?: Product;
}

export interface ServiceItem extends Item {
  type: 'service',
  serviceId?: string;
  service?: Service;
}

export type ItemTypes = UnitItem | ServiceItem;