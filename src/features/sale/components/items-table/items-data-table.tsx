 
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
import { ItemTypes } from "../../types/item";
import { getSubtotal } from "../../utils/sale";
import { Sale } from "../../types/sale";
import { Currency } from "@/components/currency";
 
interface ItemsDataTableProps {
  columns: ColumnDef<ItemTypes>[];
  sale: Sale;
}
 
export function ItemsDataTable({
  columns,
  sale
}: ItemsDataTableProps) {
  const data = sale.items; 
  const unitItems = data.filter((i) => i.type === 'unit');
  const serviceItems = data.filter((i) => i.type === 'service');
  const subTotal = getSubtotal({ items: unitItems, services: serviceItems });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
 
  return (
    <div className="rounded-md w-full">
      <Table className="w-full">
        <TableHeader className="w-full">
          {table.getHeaderGroups().map((headerGroup) => (
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
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
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
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