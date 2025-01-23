export interface UseSearch<T> {
    q: string;
    setQ: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    isError: boolean;
    data: T[] | undefined;
}