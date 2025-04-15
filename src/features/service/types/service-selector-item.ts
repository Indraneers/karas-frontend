import { Service } from "@/features/service/types/service";

export interface ServiceSelectorItem {
  price: number;
  discount: number;
  quantity: 1;
  service: Service;
  checked: boolean;
}