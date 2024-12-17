import { create } from 'zustand';
import { VehicleDto } from '@/features/vehicles/dto/vehicle.dto';
import { CustomerDto } from '@/features/customer/types/customer.dto';
import { ServiceSelectorItem } from '@/features/service-selector/types/service-selector-item';
import { ServiceItem, UnitItem } from '@/features/sale/types/item';
import { getCheckedServiceItem } from '@/features/service-selector/utils/service-selector';

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
  defaultServices: [],
  items: [],
  vehicle: defaultVehicle,
  customer: defaultVehicle.customer,
  discount: 0
};

export interface PosState {
  services: ServiceSelectorItem[];
  defaultServices?: ServiceSelectorItem[];
  items: UnitItem[];
  vehicle: VehicleDto;
  customer: CustomerDto;
  discount: number;
}

export interface PosStateWithFunctions extends PosState {
  setServices: (as: ServiceSelectorItem[]) => void;
  addService: (s: string) => void;
  updateService: (s: ServiceSelectorItem) => void
  removeService: (serviceId: string) => void;
  addItem: (i: UnitItem) => void;
  updateItem: (i: UnitItem) => void
  removeItem: (itemId: string) => void;
  setVehicleAndCustomer: (v: VehicleDto) => void;
  setDefaultVehicleAndCustomer: () => void;
  resetPos: () => void;
  setDiscount: (discount: number) => void;
}

export const usePosStore = create<PosStateWithFunctions>((set) => ({
  ...defaultPosState,
  setServices: (autoServices: ServiceSelectorItem[]) => set((state) => ({ ...state, services: autoServices, defaultServices: autoServices })),
  addService: (sId: string) => set((state) => {
    const newState = { ...state };
    newState.services = newState.services.map((s) => s.service.id === sId ? { ...s, checked: true } : s);
    return newState;
  }),
  updateService: (s: ServiceSelectorItem) => set((state) => {
    const newState = { ...state };
    newState.services = newState.services.map((a) => {
      // since this is likely to be a currency variable,
      // we wish to take the value and multiply it by 100
      if (a.service.id === s.service.id) {
        return s;
      }
      return a;
    });

    return newState;
  }),
  removeService: (sId: string) => set((state) => {
    const newState = { ...state };
    newState.services = newState.services.map((s) => s.service.id === sId ? { ...s, checked: false } : s);
    return newState;
  }),
  addItem: (i: UnitItem) => set((state) => {
    const newState = { ... state };
    newState.items.push(i);
    return newState;
  }),
  updateItem: (i: UnitItem) => set((state) => {
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
  resetPos: () => set(((state) => {
    console.log({
      ...defaultPosState,
      defaultServices: state.defaultServices,
      sevices: state.defaultServices
    });
    return {
      ...defaultPosState,
      defaultServices: state.defaultServices,
      services: state.defaultServices
    };
  })),
  setDiscount: (discount: number) => set(((state) => ({ ...state, discount })))
}));

export function useCheckedServices(): ServiceItem[] {
  const { services } = usePosStore();
  return getCheckedServiceItem(services);
}