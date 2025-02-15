import { ColumnDef } from "@tanstack/react-table";
import { Currency } from "@/components/currency";
import { calculateTotalCost } from "@/features/sale/utils/sale";
import { Item } from "@/features/sale/types/item";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import { ProductIdentifier } from "@/features/product/components/product-identifier";

export const itemColumns: ColumnDef<Item>[] = [
  {
    id: 'no',
    header: () => <div>ល.រ<br></br>N.O</div>,
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
    header: () => <div>មុខទំនិញ<br></br>Item/Service</div>,
    cell: ({ row }) => (
      <div className="flex items-center w-[300px]">
        <div className="flex items-center">
          <div>
            {row.original.unit.product.name} <ProductIdentifier identifier={row.original.unit.product.identifier} />
          </div>
          <div className={cn([
            'hidden',
            row.original.unit.product.variable && 'inline-flex items-center'
          ])}>
            <Dot />
              1 
            { row.original.unit.product.baseUnit }
          </div>
          <div className={cn([
            'hidden',
            (!row.original.unit.product.variable) && 'inline-flex items-center'
          ])}>
            <Dot />
            { row.original.unit.name }
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'price',
    header: () => <div>ថ្លៃឯកតា ($)<br></br>Price ($)</div>,
    cell: ({ row }) => (
      <div className="text-green-600">
        <Currency amount={row.original.price} />
      </div>
    )
  },
  {
    accessorKey: 'discount',
    header: () => <div>បញ្ចុះតម្លៃ ($)<br></br>Discount ($)</div>,
    cell: ({ row }) => (
      <div className="text-primary">
        <Currency amount={row.original.discount} />
      </div>
    )
  },
  {
    accessorKey: 'quantity',
    header: () => <div>បរិមាណ<br></br>Qty</div>,
    cell: ({ row }) => <div>{row.getValue('quantity')}</div>
  },
  {
    accessorKey: 'Total',
    header: () => <div>ថ្លៃទំនិញ ($)<br></br>Total ($)</div>,
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