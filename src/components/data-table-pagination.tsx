"use client";
 
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { useMemo } from "react";
import { Skeleton } from "./ui/skeleton";
import { PaginationDetail } from "@/types/pagination";
import { ContextOption } from "@/types/context-options";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "./ui/context-menu";

interface DataTablePaginationProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (data: TData) => void;
  isLoading?: boolean;
  paginationDetail: PaginationDetail;
  rowSelection: Record<string, boolean>;
  onRowSelectionChange: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  contextLabel?: string;
  contextOptions?: ContextOption<TData>[];
  showOutlineStyle?: boolean;
}

export function DataTablePagination<TData, TValue>({
  columns,
  data,
  onRowClick,
  isLoading,
  paginationDetail,
  rowSelection,
  onRowSelectionChange,
  contextLabel = 'Actions',
  contextOptions
}: DataTablePaginationProps<TData, TValue>) {
  const tableData = useMemo(
    () => (isLoading ? Array(10).fill({}) : data),
    [isLoading, data]
  );

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
          ...column,
          cell: () => <Skeleton className="h-6" />
        }))
        : columns,
    [isLoading, columns]
  );

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
    onRowSelectionChange, // Update our state when selection changes
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
    <div className={cn([
      "grid grid-rows-[1fr,auto] w-full overflow-auto"
    ])}>
      <div className="grid grid-cols-1 pb-2 rounded-lg overflow-auto">
        <Table className="relative">
          <TableHeader className="bg-muted border-b-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="rounded-md h-6" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={cn([
                        "last:pr-4 first:pl-4 font-semibold text-foreground whitespace-nowrap",
                        headerGroup.headers[0].id === header.id && "rounded-l-md",
                        headerGroup.headers[headerGroup.headers.length - 1].id === header.id && "rounded-r-md"
                      ])}
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
          <tr>
            <td></td>
          </tr>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <>
                  {
                    contextOptions &&
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <TableRow
                        className={cn([
                          onRowClick && 'cursor-pointer', 
                          'cursor-pointer hover:bg-primary/10'
                        ])}
                        onClick={() => onRowClick && !isLoading && onRowClick(row.original)}
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            className="p-2 last:pr-4 first:pl-4 whitespace-nowrap"
                            style={{
                              width: cell.column.getSize() !== 0
                                ? cell.column.getSize()
                                : undefined
                            }}
                            key={cell.id}
                          >
                            {isLoading ? (
                              <Skeleton className="h-6" />
                            ) : (
                              flexRender(cell.column.columnDef.cell, cell.getContext())
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuLabel>{contextLabel}</ContextMenuLabel>
                      <ContextMenuSeparator />
                      <ContextMenuGroup>
                        {
                          contextOptions.map(c => (
                            <ContextMenuItem
                              className="cursor-pointer"
                              key={c.key}
                              onClick={() => c.onClick(row.original as TData)}
                            >
                              {c.content}
                            </ContextMenuItem>
                          ))
                        }
                      </ContextMenuGroup>
                    </ContextMenuContent>
                  </ContextMenu>
                  }
                  {
                    !contextOptions &&
                  <TableRow
                    className={cn([onRowClick && 'cursor-pointer', 'hover:bg-accent/10 cursor-pointer'])}
                    onClick={() => onRowClick && !isLoading && onRowClick(row.original)}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="last:pr-4 first:pl-4 whitespace-nowrap"
                        style={{
                          width: cell.column.getSize() !== 0
                            ? cell.column.getSize()
                            : undefined
                        }}
                        key={cell.id}
                      >
                        {isLoading ? (
                          <Skeleton className="h-6" />
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  }
                </>
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

      <div className="flex justify-end items-center pt-4">
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

interface DataTableAutoPaginationProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (data: TData) => void;
  isLoading?: boolean;
  contextLabel?: string;
  contextOptions?: ContextOption<TData>[];
}

export function DataTableAutoPagination<TData, TValue>({
  columns,
  data,
  onRowClick,
  isLoading,
  contextLabel = 'Actions',
  contextOptions
}: DataTableAutoPaginationProps<TData, TValue>) {
  const tableData = useMemo(
    () => (isLoading ? Array(10).fill({}) : data),
    [isLoading, data]
  );

  const tableColumns = useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
          ...column,
          cell: () => <Skeleton className="h-6" />
        }))
        : columns,
    [isLoading, columns]
  );

  const table = useReactTable({
    columns: tableColumns as ColumnDef<TData, TValue>[],
    data: tableData as TData[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      minSize: 0,
      size: 10
    },
    autoResetPageIndex: false,
    getRowId: (row) => (row as { id: string }).id
  });

  return (
    <div>
      <div className="grid grid-cols-1 overflow-auto">
        <Table>
          <TableHeader className="bg-muted border-b-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={cn([
                        "last:pr-4 first:pl-4 font-semibold text-foreground whitespace-nowrap",
                        headerGroup.headers[0].id === header.id && "rounded-l-md",
                        headerGroup.headers[headerGroup.headers.length - 1].id === header.id && "rounded-r-md"
                      ])}
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
          <tr>
            <td></td>
          </tr>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <>
                  {
                    contextOptions &&
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <TableRow
                        className={cn([onRowClick && 'cursor-pointer'])}
                        onClick={() => onRowClick && !isLoading && onRowClick(row.original)}
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            className="last:pr-4 first:pl-4 whitespace-nowrap"
                            style={{
                              width: cell.column.getSize() !== 0
                                ? cell.column.getSize()
                                : undefined
                            }}
                            key={cell.id}
                          >
                            {isLoading ? (
                              <Skeleton className="h-6" />
                            ) : (
                              flexRender(cell.column.columnDef.cell, cell.getContext())
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuLabel>{contextLabel}</ContextMenuLabel>
                      <ContextMenuSeparator />
                      <ContextMenuGroup>
                        {
                          contextOptions.map(c => (
                            <ContextMenuItem
                              className="cursor-pointer"
                              key={c.key}
                              onClick={() => c.onClick(row.original as TData)}
                            >
                              {c.content}
                            </ContextMenuItem>
                          ))
                        }
                      </ContextMenuGroup>
                    </ContextMenuContent>
                  </ContextMenu>
                  }
                  {
                    !contextOptions &&
                  <TableRow
                    className={cn([onRowClick && 'cursor-pointer', 'hover:bg-accent/10 cursor-pointer h-6'])}
                    onClick={() => onRowClick && !isLoading && onRowClick(row.original)}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="last:pr-4 first:pl-4 whitespace-nowrap"
                        style={{
                          width: cell.column.getSize() !== 0
                            ? cell.column.getSize()
                            : undefined
                        }}
                        key={cell.id}
                      >
                        {isLoading ? (
                          <Skeleton className="h-6" />
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  }
                </>
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
      <div className="flex justify-end items-center px-4 py-2 pt-4">
        <div className="flex-1 text-accent text-sm">
          {table.getSelectedRowModel().rows.length} of{" "}
          {table.getRowCount()} row(s) selected.
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