import { UsePaginationState } from "./pagination";

export interface UseSearch<T> {
    q: string;
    setQ: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    isError: boolean;
    data: T[] | undefined;
}

export interface SearchPaginatedState<T> extends UsePaginationState<T> {
    enabled?: boolean;
    query?: Record<string, string | number | undefined>;
}