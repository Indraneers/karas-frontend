 
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
    <>
      <div className="rounded-md w-full overflow-auto">
        <Table className="w-full">
          <TableHeader className="bg-muted border-b-0 rounded-md w-full">
            {itemTable.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-b-0" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead 
                      className={cn([
                        "last:pr-4 first:pl-4 font-semibold text-foreground whitespace-nowrap",
                        headerGroup.headers[0].id === header.id && "rounded-l-md",
                        headerGroup.headers[headerGroup.headers.length - 1].id === header.id && "rounded-r-md"
                      ])}
                      key={header.id}>
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
          <TableBody className="w-full">
            {
              itemTable.getRowModel().rows.map((row) => (
                <TableRow
                  className='hover:bg-accent/10 last:border-b-0 cursor-pointer'
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="whitespace-nowrap" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            }
            <TableRow className={cn([
              'font-semibold text-start last:border-b-0',
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
                    <TableCell className="whitespace-nowrap" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
      <Table>
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
    </>
  );
}