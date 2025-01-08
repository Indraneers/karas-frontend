import { ColumnDef } from "@tanstack/react-table";
import { Currency } from "@/components/currency";
import { calculateTotalCost } from "@/features/sale/utils/sale";
import { Item } from "@/features/sale/types/item";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";

export const itemColumns: ColumnDef<Item>[] = [
  {
    id: 'no',
    header: 'N.O',
    cell: ({ row }) => row.index + 1
  },
  // {
  //   accessorKey: 'type',
  //   header: 'Item Type',
  //   cell: ({ row }) => (
  //     <>

  //     </>
  //   )
  // },
  {
    id: 'name',
    header: 'Item/Service Name',
    cell: ({ row }) => (
      <div className="flex items-center w-[300px]">
        {row.original.unit.product.name}
        <div className={cn([
          'hidden',
          row.original.unit.product.variable && 'flex items-center'
        ])}>
          <Dot />
          1 
          { row.original.unit.product.baseUnit }
        </div>
      </div>
    )
  },
  {
    accessorKey: 'price',
    header: 'Price ($)',
    cell: ({ row }) => (
      <div className="text-green-600">
        <Currency amount={row.original.price} />
      </div>
    )
  },
  {
    accessorKey: 'discount',
    header: 'Discount ($)',
    cell: ({ row }) => (
      <div className="text-primary">
        <Currency amount={row.original.discount} />
      </div>
    )
  },
  {
    accessorKey: 'quantity',
    header: 'Qty',
    cell: ({ row }) => <div className="text-center">{row.getValue('quantity')}</div>
  },
  {
    accessorKey: 'Total',
    header: 'Total ($)',
    cell: ({ row }) => (
      <div className="font-medium text-green-700">
        <Currency amount={
          calculateTotalCost(
            row.original.price,
            row.original.discount,
            row.original.quantity
          )
        } />
      </div>
    )
  }
];