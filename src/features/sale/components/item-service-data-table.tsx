 
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { getSubtotal } from "../utils/sale";
import { Sale } from "../types/sale";
import { Currency } from "@/components/currency";
import { Item } from "../types/item";
import { MaintenanceService } from "@/features/maintenance/types/maintenance-service";
import { cn } from "@/lib/utils";
 
interface ItemServiceDataTableProps {
  itemColumns: ColumnDef<Item>[];
  serviceColumns: ColumnDef<MaintenanceService>[];
  sale: Sale;
}
 
export function ItemServiceDataTable({
  itemColumns,
  serviceColumns,
  sale
}: ItemServiceDataTableProps) {
  const { items, maintenance } = sale;
  
  const services: MaintenanceService[] = maintenance?.services || [];

  // const serviceItems = data.filter((i) => i.type === 'service');
  const subTotal = getSubtotal({ items, maintenanceServices: services });

  const itemTable = useReactTable({
    data: items,
    columns: itemColumns,
    getCoreRowModel: getCoreRowModel()
  });

  const serviceTable = useReactTable({
    data: services,
    columns: serviceColumns,
    getCoreRowModel: getCoreRowModel()
  });
 
  return (
    <div className="rounded-md w-full">
      <Table className="w-full">
        <TableHeader className="w-full">
          {itemTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
        <TableBody className="w-full">
          {
            itemTable.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          }
          <TableRow className={cn([
            'font-semibold text-start',
            services.length === 0 && 'hidden'
          ])}>
            <TableCell colSpan={6}>
              Service Description
            </TableCell>
          </TableRow>
          {
            serviceTable.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>Subtotal ($)</TableCell>
            <TableCell className="text-right">
              <Currency amount={subTotal} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>Discount ($)</TableCell>
            <TableCell className="text-right">
              <Currency amount={sale.discount} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>Total ($)</TableCell>
            <TableCell className="text-right">
              <Currency amount={subTotal - sale.discount} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}