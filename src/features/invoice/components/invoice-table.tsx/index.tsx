import { itemColumns } from "./item-columns";
import { Sale } from "@/features/sale/types/sale";
import { cn } from "@/lib/utils";
import { serviceColumns } from "./service-columns";
import { collateUnitItem } from "../../utils/collate";
 
import {
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
import { getSubtotal } from "@/features/sale/utils/sale";
import { Currency } from "@/components/currency";

export function InvoiceTable({ sale, className } : { sale: Sale, className?: string }) {
  const invoiceSale: Sale = {
    ...sale,
    items: collateUnitItem(sale.items)
  };

  const { items, maintenance: { services } } = invoiceSale;
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
    <div className={cn([
      'w-full',
      className
    ])}>
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
            <TableRow>
              <TableCell colSpan={5}>Subtotal ($)</TableCell>
              <TableCell className="text-right">
                <Currency amount={subTotal} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}>Discount ($)</TableCell>
              <TableCell className="text-right">
                <Currency amount={sale.discount} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}>Total ($)</TableCell>
              <TableCell className="text-right">
                <Currency amount={subTotal - sale.discount} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}