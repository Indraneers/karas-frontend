import { create } from 'zustand';
import { AutoServiceItem } from '../types/auto-service-item';
import { Item } from '@/types/item';

export interface PosState {
  services: AutoServiceItem[];
  items: Item[];
  setServices: (as: AutoServiceItem[]) => void;
  setItems: (i: Item[]) => void
}

export const usePosStore = create<PosState>((set) => ({
  services: [],
  items: [],
  setServices: (autoServices: AutoServiceItem[]) => set((state) => ({ ...state, services: autoServices })),
  setItems: (items: Item[]) => set((state) => ({ ...state, items }))
}));