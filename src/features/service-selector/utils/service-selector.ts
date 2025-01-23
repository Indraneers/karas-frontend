
// import { ServiceSelectorItem } from "../types/service-selector-item";
// import { v4 as uuidv4 } from 'uuid';

// export function convertServiceSelectorItemToServiceItem(serviceSelectorItem: ServiceSelectorItem): ServiceItem {
//   return {
//     type: 'service',
//     id: uuidv4(),
//     price: serviceSelectorItem.price,
//     quantity: serviceSelectorItem.quantity,
//     discount: serviceSelectorItem.discount,
//     service: serviceSelectorItem.service
//   };
// }

// export function getCheckedServiceItem(serviceList: ServiceSelectorItem[]): ServiceItem[] {
//   return serviceList
//     .filter(s => s.checked)
//     .map(s => convertServiceSelectorItemToServiceItem(s));
// }