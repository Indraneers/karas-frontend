import { create } from "zustand";
import { ItemSelectionEnum } from "../types/item-selection-enum";

interface ItemSelectionState {
  selector: ItemSelectionEnum;
  setSelector: (itemSelectionType: ItemSelectionEnum) => void;
}

export const useItemSelectionStore = create<ItemSelectionState>((set) => ({
  selector: ItemSelectionEnum.UNIT,
  setSelector: (i) => set((state) => ({ ...state, selector: i }))
}));