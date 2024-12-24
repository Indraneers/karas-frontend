import { create } from 'zustand';
import { VehicleDto } from '@/features/vehicles/dto/vehicle.dto';
import { CustomerDto } from '@/features/customer/types/customer.dto';
import { ServiceSelectorItem } from '@/features/service-selector/types/service-selector-item';
import { ServiceItem, UnitItem } from '@/features/sale/types/item';
import { getCheckedServiceItem } from '@/features/service-selector/utils/service-selector';
import { SaleResponseDto } from '@/features/sale/types/sale.dto';
import { convertSaleResponseDtoToSale } from '@/features/sale/utils/sale';
import { Sale } from '@/features/sale/types/sale';

const defaultVehicle: VehicleDto = {
  engineNo: '-',
  makeAndModel: '-',
  vinNo: '-',
  mileage: 0,
  note: '',
  plateNumber: '-',
  customer: {
    id: '',
    name: ''
  }
};

function getDefaultPosState() {
  return {
    services: [],
    defaultServices: [],
    items: [],
    vehicle: defaultVehicle,
    customer: {
      id: '',
      name: ''
    },
    discount: 0,
    dueDate: new Date(),
    isInit: false
  };
}

export interface PosState {
  services: ServiceSelectorItem[];
  defaultServices: ServiceSelectorItem[];
  items: UnitItem[];
  vehicle: VehicleDto;
  customer: CustomerDto;
  discount: number;
  dueDate: Date;
  isInit: boolean;
}

export interface PosStateWithFunctions extends PosState {
  setServices: (as: ServiceSelectorItem[]) => void;
  addService: (s: string) => void;
  updateService: (serviceId: string, s: ServiceSelectorItem) => void
  removeService: (serviceId: string) => void;
  addItem: (i: UnitItem) => void;
  updateItem: (itemId: string, i: UnitItem) => void
  removeItem: (itemId: string) => void;
  setCustomer: (c: CustomerDto) => void;
  setVehicle: (v: VehicleDto) => void;
  setVehicleAndCustomer: (v: VehicleDto) => void;
  setDefaultVehicleAndCustomer: () => void;
  setDefaultVehicle: () => void;
  resetPos: () => void;
  setDiscount: (discount: number) => void;
  setPosState: (saleDto: SaleResponseDto | undefined) => void;
  setDueDate: (date: Date | undefined) => void;
}

export const usePosStore = create<PosStateWithFunctions>((set) => ({
  ...getDefaultPosState(),
  setServices: (autoServices: ServiceSelectorItem[]) => set((state) => ({ ...state, services: autoServices, defaultServices: autoServices })),
  addService: (sId: string) => set((state) => {
    const newState = { ...state };
    newState.services = newState.services.map((s) => s.service.id === sId ? { ...s, checked: true } : s);
    return newState;
  }),
  updateService: (serviceId: string, s: ServiceSelectorItem) => set((state) => {
    const newState = { ...state };
    newState.services = newState.services.map((a) => {
      if (a.service.id === serviceId) {
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
  updateItem: (itemId: string, i: UnitItem) => set((state) => {
    const newState = { ...state };
    newState.items = newState.items.map((item) => {
      if (itemId === item.id) {
        return i;
      }
      return item;
    });
    return newState;
  }),
  removeItem: (itemId: string) => set((state) => ({ ...state, items: state.items.filter(i => itemId !== i.id) })),
  setVehicle: (vehicle: VehicleDto) => set((state) => ({ ...state, vehicle })),
  setCustomer: (customer: CustomerDto) => set((state) => ({ ...state, customer: customer, vehicle: defaultVehicle })),
  setVehicleAndCustomer: (vehicle: VehicleDto) => set((state) => ({ ...state, vehicle, customer: vehicle.customer })),
  setDefaultVehicleAndCustomer: () => set((state) => ({ ...state, vehicle: defaultVehicle, customer: defaultVehicle.customer })),
  resetPos: () => set(((state) => {
    return {
      ...getDefaultPosState(),
      defaultServices: state.defaultServices,
      services: state.defaultServices
    };
  })),
  setDefaultVehicle: () => set((state) => ({ ...state, vehicle: defaultVehicle })),
  setDiscount: (discount: number) => set((state) => ({ ...state, discount })),
  setPosState: (saleDto: SaleResponseDto | undefined) => set((state) => {
    if (!saleDto || !state.defaultServices) {
      return state;
    }

    const sale: Sale = convertSaleResponseDtoToSale(saleDto);

    const unitItemDtos: UnitItem[] =
      sale.items.filter((i) => i.type === 'unit');

    const services: ServiceItem[] =
      sale.items
        .filter((i) => i.type === 'service');

    const selectedServices: ServiceSelectorItem[] =
      state.defaultServices.map(ds => {
        const service = services.find(s => s.service?.id === ds.service.id);
        if (service) {
          return {
            ...ds,
            discount: service.discount,
            price: service.price,
            checked: true
          };
        }
        return ds;
      });
      
    return {
      ...state,
      isInit: true,
      dueDate: new Date(sale.dueDate),
      items: unitItemDtos,
      services: selectedServices,
      vehicle: sale.vehicle,
      customer: sale.customer,
      user: sale.user,
      discount: sale.discount
    };
  }),
  setDueDate: (dueDate: Date | undefined) => set((state) => ({ ...state, dueDate }))
}));

export function useCheckedServices(): ServiceItem[] {
  const { services } = usePosStore();
  return getCheckedServiceItem(services);
}