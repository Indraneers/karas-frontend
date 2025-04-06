import { OnChangeFn, PaginationState } from "@tanstack/react-table";
import { Page } from "./page";
import { APIQuery } from "./query";

export interface UsePaginationState<T> {
  pageSize?: number;
  pageIndex?: number;
  key: string;
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