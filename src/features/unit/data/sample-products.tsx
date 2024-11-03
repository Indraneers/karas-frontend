import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: '1',
    name: 'Valvoline Full Synthetic High Mileage Engine Oil 5W-30',
    units: [
      {
        id: '123',
        name: '1L',
        sku: '1001-SYN-5W30',
        quantity: 100,
        price: 500
      },
      {
        id: '234',
        name: '2L',
        sku: '1001-SYN-5W30',
        quantity: 100,
        price: 1000
      }
    ]
  },
  {
    id: '2',
    name: 'Valvoline Full Synthetic High Mileage Engine Oil 5W-20',
    units: [
      {
        id: '345',
        name: '1L',
        sku: '1001-SYN-5W20',
        quantity: 100,
        price: 500
      }
    ]
  }
];