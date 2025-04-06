"use client";
 
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { PaginationDetail } from "@/types/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (data: TData) => void;
  isLoading?: boolean;
  paginationDetail: PaginationDetail;
}

export function DataTablePagination<TData, TValue>({
  columns,
  data,
  onRowClick,
  isLoading,
  paginationDetail
}: DataTableProps<TData, TValue>) {
  const tableData = useMemo(
    () => (isLoading ? Array(10).fill({}) : data),
    [isLoading, data]
  );

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
          ...column,
          cell: () => <Skeleton className="h-4" />
        }))
        : columns,
    [isLoading, columns]
  );

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    columns: tableColumns as ColumnDef<TData, TValue>[],
    data: tableData as TData[],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: paginationDetail.pageCount,
    state: {
      pagination: paginationDetail.pagination,
      rowSelection
    },
    onRowSelectionChange: setRowSelection, // Update our state when selection changes
    onPaginationChange: paginationDetail.onPaginationChange,
    defaultColumn: {
      minSize: 0,
      size: 0
    },
    autoResetPageIndex: false,
    rowCount: paginationDetail.rowCount,
    getRowId: (row) => (row as { id: string }).id
  });

  // Calculate total selected rows across all pages
  const totalSelectedRows = Object.keys(rowSelection).filter(
    (id) => rowSelection[id]
  ).length;

  return (
    <div className="grid grid-rows-[1fr,auto]">
      <div className="border rounded-md">
        <Table>
          <TableHeader className="bg-foreground/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize() !== 0 ? header.getSize() : undefined
                      }}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={cn([onRowClick && 'cursor-pointer'])}
                  onClick={() => onRowClick && !isLoading && onRowClick(row.original)}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      style={{
                        width: cell.column.getSize() !== 0
                          ? cell.column.getSize()
                          : undefined
                      }}
                      key={cell.id}
                    >
                      {isLoading ? (
                        <Skeleton className="h-4" />
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {isLoading ? 'Loading...' : 'No results.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end items-center py-4">
        <div className="flex-1 text-accent text-sm">
          {totalSelectedRows} of{" "}
          {paginationDetail.rowCount} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || isLoading}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || isLoading}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}