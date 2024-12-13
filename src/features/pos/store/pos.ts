import { create } from 'zustand';
import { AutoServiceItem } from '@/features/service-selector/types/auto-service-item';
import { Item } from '@/types/item';
import { VehicleDto } from '@/features/vehicles/dto/vehicle.dto';
import { CustomerDto } from '@/features/customer/types/customer.dto';

const defaultVehicle: VehicleDto = {
  engineNo: '-',
  makeAndModel: '-',
  vinNo: '-',
  mileage: 0,
  note: '',
  plateNumber: '-',
  customer: {
    name: ''
  }
};

const defaultPosState = {
  services: [],
  items: [],
  vehicle: defaultVehicle,
  customer: defaultVehicle.customer,
  discount: 0
};

export interface PosState {
  services: AutoServiceItem[];
  items: Item[];
  vehicle: VehicleDto;
  customer: CustomerDto;
  discount: number;
}

export interface PosStateWithFunctions extends PosState {
  setServices: (as: AutoServiceItem[]) => void;
  addService: (s: string) => void;
  updateService: (s: AutoServiceItem) => void
  removeService: (serviceId: string) => void;
  addItem: (i: Item) => void;
  updateItem: (i: Item) => void
  removeItem: (itemId: string) => void;
  setVehicleAndCustomer: (v: VehicleDto) => void;
  setDefaultVehicleAndCustomer: () => void;
  resetPos: () => void;
  setDiscount: (discount: number) => void;
}

export const usePosStore = create<PosStateWithFunctions>((set) => ({
  ...defaultPosState,
  setServices: (autoServices: AutoServiceItem[]) => set((state) => ({ ...state, services: autoServices })),
  addService: (sId: string) => set((state) => {
    const newState = { ...state };
    newState.services = newState.services.map((s) => s.autoService.id === sId ? { ...s, checked: true } : s);
    return newState;
  }),
  updateService: (s: AutoServiceItem) => set((state) => {
    const newState = { ...state };
    newState.services = newState.services.map((a) => {
      // since this is likely to be a currency variable,
      // we wish to take the value and multiply it by 100
      if (a.autoService.id === s.autoService.id) {
        return s;
      }
      return a;
    });

    return newState;
  }),
  removeService: (sId: string) => set((state) => {
    const newState = { ...state };
    newState.services = newState.services.map((s) => s.autoService.id === sId ? { ...s, checked: false } : s);
    return newState;
  }),
  addItem: (i: Item) => set((state) => {
    const newState = { ... state };
    newState.items.push(i);
    return newState;
  }),
  updateItem: (i: Item) => set((state) => {
    const newState = { ...state };
    newState.items = newState.items.map((item) => {
      // since this is likely to be a currency variable,
      // we wish to take the value and multiply it by 100
      if (item.id == i.id) {
        return i;
      }
      return item;
    });

    return newState;
  }),
  removeItem: (itemId: string) => set((state) => ({ ...state, items: state.items.filter(i => itemId !== i.id) })),
  setVehicleAndCustomer: (vehicle: VehicleDto) => set((state) => ({ ...state, vehicle, customer: vehicle.customer })),
  setDefaultVehicleAndCustomer: () => set((state) => ({ ...state, vehicle: defaultVehicle, customer: defaultVehicle.customer })),
  resetPos: () => set((() => (defaultPosState))),
  setDiscount: (discount: number) => set(((state) => ({ ...state, discount })))
}));