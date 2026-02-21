import { SearchPaginatedState } from "@/types/use-search";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

const PAGE_SIZE = 10;

export function useSearchPagination<T>({
  key,
  getEntity,
  enabled,
}: SearchPaginatedState<T>) {
  const search = useSearch({ strict: false }) as Record<string, unknown> & {
    page?: number;
    q?: string;
  };

  const navigate = useNavigate();

  const routePage = (search.page as number | undefined) ?? 1;
  const routeQ = (search.q as string | undefined) ?? "";

  const { page: _p, q: _q, ...queryParams } = search;

  const debouncedQ = useDebounce(routeQ, 500);

  const [rowCount, setRowCount] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const { isError, isLoading, data } = useQuery({
    queryKey: [...key, routePage, debouncedQ, queryParams],
    queryFn: () =>
      getEntity({ page: routePage - 1, q: debouncedQ, ...queryParams }),
    enabled: enabled ?? true,
  });

  useEffect(() => {
    if (!data) return;
    if (pageCount !== data.totalPages + 1) setPageCount(data.totalPages + 1);
    if (rowCount !== data.totalElements) setRowCount(data.totalElements);
  }, [data]);

  const setPage = (pageIndex: number) => {
    void navigate({
      search: (prev: Record<string, unknown>) =>
        ({
          ...prev,
          page: pageIndex,
        }) as never,
    });
  };

  const setQ = (q: string) => {
    void navigate({
      search: (prev: Record<string, unknown>) =>
        ({
          ...prev,
          q,
          page: 1,
        }) as never,
    });
  };

  const pagination = {
    pageIndex: routePage,
    pageSize: PAGE_SIZE,
  };

  const onPaginationChange = (
    updater:
      | typeof pagination
      | ((prev: typeof pagination) => typeof pagination),
  ) => {
    const next = typeof updater === "function" ? updater(pagination) : updater;
    if (next.pageIndex !== routePage) {
      setPage(next.pageIndex);
    }
  };

  return {
    onPaginationChange,
    pageCount,
    rowCount,
    pagination,
    paginationDetail: {
      onPaginationChange,
      pageCount,
      rowCount,
      pagination,
    },
    isError,
    isLoading,
    data,
    q: routeQ,
    setQ,
  };
}
