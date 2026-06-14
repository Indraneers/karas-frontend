// types/use-search.ts
import { UsePaginationState } from "./pagination";

export interface UseSearch<T> {
  q: string;
  setQ: (q: string) => void;
  isLoading: boolean;
  isError: boolean;
  data: T[] | undefined;
}

export interface SearchPaginatedState<T> extends UsePaginationState<T> {
  enabled?: boolean;
}

export interface InfinitePaginatedState<T> extends UsePaginationState<T> {
  enabled?: boolean;
  query?: Record<string, string | number | undefined | Date>;
}