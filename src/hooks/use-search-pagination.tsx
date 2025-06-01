import { SearchPaginatedState } from "@/types/use-search";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import _ from 'lodash';

export function useSearchPagination<T>({ key, getEntity, enabled, query } : SearchPaginatedState<T>) {
  const [q, setQ] = useState<string>('');
  const [queryParams, setQueryParams] = useState(query);
  const debouncedQ = useDebounce(q, 500);

  const [rowCount, setRowCount] = useState(1);
    
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageIndex: 0
  });

  const { isError, isLoading, data } = useQuery({
    queryKey: [
      ...key, 
      pagination.pageIndex, 
      q,
      ...Object.entries(queryParams ?? {}).map(([k, v]) => `${ String(k) }-${ String(v) }`)
    ],
    queryFn: () => getEntity({ page: pagination.pageIndex, q, ...queryParams }),
    enabled: enabled || (debouncedQ !== '' || q !== undefined) // More robust enabled condition
  });

  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    if (data && pageCount != data.totalPages) {
      setPageCount(data.totalPages);
    }
    if (data && rowCount != data.totalElements) {
      setRowCount(data.totalElements);
    }
  }, [data, pageCount, rowCount]);

  useEffect(() => {
    if (data && pagination.pageSize != data.pageable.pageSize) {
      setPagination({
        ...pagination,
        pageSize: data.pageable.pageSize
      });
    }
  }, [data, pagination]);

  useEffect(() => {
    if (!_.isEqual(queryParams, query)) {
      setQueryParams(query);
      setPagination({
        pageIndex: 0,
        pageSize: 10
      });
    }
  }, [queryParams, query]);

  const onPaginationChange = setPagination;
  
  return {
    onPaginationChange,
    pageCount,
    rowCount,
    pagination,
    paginationDetail: {
      onPaginationChange,
      pageCount,
      rowCount,
      pagination
    },
    isError,
    isLoading,
    data,
    q,
    setQ
  };
}