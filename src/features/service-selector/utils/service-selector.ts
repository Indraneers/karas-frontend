
import { ServiceItem } from "@/features/sale/types/item";
import { ServiceSelectorItem } from "../types/service-selector-item";

export function convertServiceSelectorItemToServiceItem(serviceSelectorItem: ServiceSelectorItem): ServiceItem {
  return {
    type: 'service',
    price: serviceSelectorItem.price,
    quantity: serviceSelectorItem.quantity,
    discount: serviceSelectorItem.discount,
    service: serviceSelectorItem.service
  };
}

export function getCheckedServiceItem(serviceList: ServiceSelectorItem[]): ServiceItem[] {
  return serviceList
    .filter(s => s.checked)
    .map(s => convertServiceSelectorItemToServiceItem(s));
}