import { create } from "zustand";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { CategoryDto } from "@/features/category/dto/category.dto";
import { ProductDto } from "@/features/product/dto/product.dto";

interface ItemSelectionState {
  selector: ItemSelectionEnum;
  category: CategoryDto | null;
  product: ProductDto | null;
  query: string | null;
  setCategory: (category: CategoryDto) => void;
  setProduct: (product: ProductDto) => void;
  setSelector: (itemSelectionType: ItemSelectionEnum) => void;
  setQuery: (q: string) => void;
}

export const useItemSelectionStore = create<ItemSelectionState>((set) => ({
  selector: ItemSelectionEnum.CATEGORY,
  category: null,
  product: null,
  query: null,
  setSelector: (i: ItemSelectionEnum) => set((state) => ({ ...state, selector: i })),
  setCategory: (c: CategoryDto) => set((state) => ({ ...state, category: c, product: null })),
  setProduct: (p: ProductDto) => set((state) => ({ ...state, product: p })),
  setQuery: (q: string) => set((state) => ({ ...state, query: q }))
}));