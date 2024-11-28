import { create } from "zustand";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { CategoryDto } from "@/features/category/dto/category.dto";
import { ProductDto } from "@/features/product/dto/product.dto";

interface ItemSelectionState {
  selector: ItemSelectionEnum;
  category: CategoryDto | null;
  product: ProductDto | null;
  setCategory: (category: CategoryDto) => void;
  setProduct: (product: ProductDto) => void;
  setSelector: (itemSelectionType: ItemSelectionEnum) => void;
}

export const useItemSelectionStore = create<ItemSelectionState>((set) => ({
  selector: ItemSelectionEnum.CATEGORY,
  category: null,
  product: null,
  setSelector: (i: ItemSelectionEnum) => set((state) => ({ ...state, selector: i })),
  setCategory: (c: CategoryDto) => set((state) => ({ ...state, category: c, productId: null })),
  setProduct: (p: ProductDto) => set((state) => ({ ...state, p: p }))
}));