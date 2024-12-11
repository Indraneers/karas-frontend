import { create } from 'zustand';
import { AutoServiceItem } from '../types/auto-service-item';
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
  customer: defaultVehicle.customer
};

export interface PosState {
  services: AutoServiceItem[];
  items: Item[];
  vehicle: VehicleDto;
  customer: CustomerDto;
  setServices: (as: AutoServiceItem[]) => void;
  setItems: (i: Item[]) => void;
  setVehicleAndCustomer: (v: VehicleDto) => void;
  setDefaultVehicleAndCustomer: () => void;
  deleteItem: (itemId: string) => void;
  resetPos: () => void;
}

export const usePosStore = create<PosState>((set) => ({
  ...defaultPosState,
  setServices: (autoServices: AutoServiceItem[]) => set((state) => ({ ...state, services: autoServices })),
  setItems: (items: Item[]) => set((state) => ({ ...state, items })),
  setVehicleAndCustomer: (vehicle: VehicleDto) => set((state) => ({ ...state, vehicle, customer: vehicle.customer })),
  setDefaultVehicleAndCustomer: () => set((state) => ({ ...state, vehicle: defaultVehicle, customer: defaultVehicle.customer })),
  deleteItem: (itemId: string) => set((state) => ({ ...state, items: state.items.filter(i => itemId !== i.id) })),
  resetPos: () => set((() => (defaultPosState)))
}));