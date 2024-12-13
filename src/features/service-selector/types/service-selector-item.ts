import { Service } from "@/features/service/types/service";

export interface ServiceSelectorItem {
  price: string;
  discount: string;
  quantity: 1;
  service: Service;
  checked?: boolean;
}