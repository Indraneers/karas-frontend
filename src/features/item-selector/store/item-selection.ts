import { create } from "zustand";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { CategoryDto } from "@/features/category/types/category.dto";
import { ProductResponseDto } from "@/features/product/types/product.dto";
import { SubcategoryResponseDto } from "@/features/subcategory/types/subcategory.dto";

interface ItemSelectionState {
  selector: ItemSelectionEnum;
  category: CategoryDto | null;
  subcategory: SubcategoryResponseDto | null;
  product: ProductResponseDto | null;
  query: string | null;
  setCategory: (category: CategoryDto) => void;
  setSubcategory: (subcategory: SubcategoryResponseDto) => void;
  setProduct: (product: ProductResponseDto) => void;
  setSelector: (itemSelectionType: ItemSelectionEnum) => void;
  setQuery: (q: string) => void;
}

export const useItemSelectionStore = create<ItemSelectionState>((set) => ({
  selector: ItemSelectionEnum.CATEGORY,
  category: null,
  subcategory: null,
  product: null,
  query: null,
  setSelector: (i: ItemSelectionEnum) => set((state) => ({ ...state, selector: i })),
  setCategory: (c: CategoryDto) => set((state) => ({ ...state, category: c, subcategory: null, product: null })),
  setSubcategory: (sc: SubcategoryResponseDto) => set((state) => ({ ...state, subcategory: sc, product: null })),
  setProduct: (p: ProductResponseDto) => set((state) => ({ ...state, product: p })),
  setQuery: (q: string) => set((state) => ({ ...state, query: q }))
}));