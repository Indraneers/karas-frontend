import { create } from 'zustand';
import { VehicleDto } from '@/features/vehicles/dto/vehicle.dto';
import { CustomerDto } from '@/features/customer/types/customer.dto';
import { ServiceSelectorItem } from '@/features/service-selector/types/service-selector-item';
// import { getCheckedServiceItem } from '@/features/service-selector/utils/service-selector';
import { SaleResponseDto } from '@/features/sale/types/sale.dto';
import { convertSaleResponseDtoToSale } from '@/features/sale/utils/sale';
import { Sale } from '@/features/sale/types/sale';
import { Item } from '@/features/sale/types/item';
import { Maintenance } from '@/features/maintenance/types/maintenance';
import { MaintenanceService } from '@/features/maintenance/types/maintenance-service';

const defaultVehicle: VehicleDto = {
  engineNo: '-',
  makeAndModel: '-',
  vinNo: '-',
  mileage: 0,
  note: '',
  plateNumber: '-',
  customer: {
    id: '',
    name: '',
    note: '',
    address: '',
    contact: ''
  }
};

function getDefaultPosState(): PosState {
  return {
    maintenance: {
      id: '',
      createdAt: new Date(),
      saleId : '',
      vehicleId: '',
      mileage: 0,
      note: '',
      services: []
    },
    serviceSelectorItems: [],
    items: [],
    vehicle: defaultVehicle,
    customer: {
      id: '',
      name: '',
      note: '',
      address: '',
      contact: ''
    },
    discount: 0,
    dueAt: new Date(),
    isInit: false
  };
}

export interface PosState {
  maintenance: Maintenance;
  serviceSelectorItems: ServiceSelectorItem[];
  items: Item[];
  vehicle: VehicleDto;
  customer: CustomerDto;
  discount: number;
  dueAt: Date;
  isInit: boolean;
}

export interface PosStateWithFunctions extends PosState {
  setServiceSelectorItems: (as: ServiceSelectorItem[]) => void;
  addService: (s: string) => void;
  updateService: (serviceId: string, s: MaintenanceService) => void
  removeService: (serviceId: string) => void;
  addItem: (i: Item) => void;
  updateItem: (itemId: string, i: Item) => void
  removeItem: (itemId: string) => void;
  setCustomer: (c: CustomerDto) => void;
  setVehicle: (v: VehicleDto) => void;
  setVehicleAndCustomer: (v: VehicleDto) => void;
  setDefaultVehicleAndCustomer: () => void;
  setDefaultVehicle: () => void;
  resetPos: () => void;
  setDiscount: (discount: number) => void;
  setPosState: (saleDto: SaleResponseDto | undefined) => void;
  setDueAt: (date: Date | undefined) => void;
}

export const usePosStore = create<PosStateWithFunctions>((set) => ({
  ...getDefaultPosState(),
  setServiceSelectorItems: (autoServices: ServiceSelectorItem[]) => set((state) => {
    return { 
      ...state, 
      serviceSelectorItems: autoServices 
    };
  }),
  addService: (sId: string) => set((state) => {
    const newState = { ...state };
    const serviceSelectorItem = newState.serviceSelectorItems.find((s) => s.service.id === sId);

    if (!serviceSelectorItem) {
      return state;
    }
    

    const { service } = serviceSelectorItem;

    const maintenanceService: MaintenanceService = {
      id: '',
      service,
      price: service.price,
      discount: 0
    };

    newState.maintenance.services.push(maintenanceService);
    serviceSelectorItem.checked = true;

    return newState;
  }),
  updateService: (serviceId: string, ms: MaintenanceService) => set((state) => {
    const newState = { ...state };
    newState.maintenance.services = newState.maintenance.services.map((a) => {
      if (a.service.id === serviceId) {
        return ms;
      }
      return a;
    });

    return newState;
  }),
  removeService: (sId: string) => set((state) => {
    const newState = { ...state };
    const serviceSelectorItem = newState.serviceSelectorItems.find((s) => s.service.id === sId);

    if (!serviceSelectorItem) {
      return state;
    }
    
    newState.maintenance.services = newState.maintenance.services.filter((s) => s.service.id !== sId);
    serviceSelectorItem.checked = false;

    return newState;
  }),
  addItem: (i: Item) => set((state) => {
    const newState = { ... state };
    newState.items.push(i);
    return newState;
  }),
  updateItem: (itemId: string, i: Item) => set((state) => {
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
  setVehicle: (vehicle: VehicleDto) => set((state) => ({ ...state, vehicle, maintenance: { ...state.maintenance, vehicleId: vehicle.id || '' } })),
  setCustomer: (customer: CustomerDto) => set((state) => ({ ...state, customer: customer, vehicle: defaultVehicle })),
  setVehicleAndCustomer: (vehicle: VehicleDto) => set((state) => ({ ...state, vehicle, customer: vehicle.customer, maintenance: { ...state.maintenance, vehicleId: vehicle.id || '' } })),
  setDefaultVehicleAndCustomer: () => set((state) => ({ ...state, vehicle: defaultVehicle, customer: defaultVehicle.customer })),
  resetPos: () => set(((state) => {
    return {
      ...getDefaultPosState(),
      serviceSelectorItems: state.serviceSelectorItems.map(sst => ({ ...sst, checked: false }))
    };
  })),
  setDefaultVehicle: () => set((state) => ({ ...state, vehicle: defaultVehicle })),
  setDiscount: (discount: number) => set((state) => ({ ...state, discount })),
  setPosState: (saleDto: SaleResponseDto | undefined) => set((state) => {
    if (!saleDto || !state.serviceSelectorItems) {
      return state;
    }

    const sale: Sale = convertSaleResponseDtoToSale(saleDto);

    // const services: ServiceItem[] =
    //   sale.items
    //     .filter((i) => i.type === 'service');

    // const selectedServices: ServiceSelectorItem[] =
    //   state.defaultServices.map(ds => {
    //     const service = services.find(s => s.service?.id === ds.service.id);
    //     if (service) {
    //       return {
    //         ...ds,
    //         discount: service.discount,
    //         price: service.price,
    //         checked: true
    //       };
    //     }
    //     return ds;
    //   });
      
    return {
      ...state,
      isInit: true,
      dueAt: new Date(sale.dueAt),
      items: sale.items,
      services: [],
      vehicle: sale.vehicle,
      customer: sale.customer,
      user: sale.user,
      discount: sale.discount
    };
  }),
  setDueAt: (dueAt: Date | undefined) => set((state) => ({ ...state, dueAt }))
}));

// export function useCheckedServices(): ServiceItem[] {
//   const { services } = usePosStore();
//   return getCheckedServiceItem(services);
// }