import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState, Dispatch } from "react";
import { InfinitePaginatedState } from "@/types/use-search";
import { Page } from "@/types/page";

interface UseInfinitySearch<T> {
  isError: boolean;
  isLoading: boolean;
  data: InfiniteData<Page<T>, unknown> | undefined;
  q: string;
  setQ: Dispatch<React.SetStateAction<string>>;
  totalElements: number;
  totalPages: number;
  fetchNextPage?: (
    options?: FetchNextPageOptions,
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<Page<T>, unknown>, Error>
  >;
  hasNextPage?: boolean;
}

export function useInfiniteSearch<T>({
  getEntity,
  key,
  enabled = true,
  query,
}: InfinitePaginatedState<T>): UseInfinitySearch<T> {
  const [q, setQ] = useState<string>("");
  const debouncedQ = useDebounce(q, 500);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const { isError, isLoading, data, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [key, debouncedQ], // Include query in the key
      queryFn: ({ pageParam = 0 }) =>
        getEntity({ q: debouncedQ, page: pageParam, ...query }),
      initialPageParam: 0,
      // fetch from backend
      getNextPageParam: (lastPage) => {
        const { totalPages, number } = lastPage;
        const nextPage = number + 1 < totalPages ? number + 1 : undefined;
        return nextPage;
      },
      enabled: enabled || debouncedQ !== "" || q !== undefined, // More robust enabled condition
    });

  useEffect(() => {
    const lastPage = data?.pages?.[data.pages.length - 1];

    if (lastPage) {
      if (lastPage.totalElements !== totalElements) {
        setTotalElements(lastPage.totalElements);
      }

      if (lastPage.totalPages !== totalPages) {
        setTotalPages(lastPage.totalPages);
      }
    }
  }, [data, totalElements, totalPages]);

  return {
    isError,
    isLoading,
    data,
    q,
    setQ,
    totalElements,
    totalPages,
    hasNextPage,
    fetchNextPage,
  };
}
