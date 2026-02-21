import { OnChangeFn, PaginationState } from "@tanstack/react-table";
import { Page } from "./page";
import { APIQuery } from "./query";
import { QueryKey } from "@tanstack/react-query";

export interface UsePaginationState<T> {
  pageSize?: number;
  pageIndex?: number;
  key: QueryKey;
  getEntity: (q: APIQuery) => Promise<Page<T>>
}

export interface PaginationDetail {
  onPaginationChange: OnChangeFn<PaginationState>;
  pageCount: number;
  rowCount: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  }
}