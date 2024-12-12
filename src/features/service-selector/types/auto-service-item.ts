import { AutoService } from "@/types/auto-service";

export interface AutoServiceItem {
  price: string;
  discount: string;
  quantity: 1;
  autoService: AutoService;
  checked?: boolean;
}