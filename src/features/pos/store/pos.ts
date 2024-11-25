import { create } from 'zustand';
import { AutoServiceItem } from '../types/auto-service-item';

export interface PosState {
  services: AutoServiceItem[];
  setServices: (as: AutoServiceItem[]) => void;
}

export const usePosStore = create<PosState>((set) => ({
  services: [],
  setServices: (autoServices: AutoServiceItem[]) => set(() => ({ services: autoServices }))
}));