import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Currency } from "@/components/currency";
import { calculateTotalCost } from "../../utils/sale";
import { Item } from "../../types/item";
import { cn } from "@/lib/utils";
import { ProductIdentifier } from "@/features/product/components/product-identifier";
import { Dot } from "lucide-react";

export const itemColumns: ColumnDef<Item>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="font-semibold"> Item ID</div>,
    cell: ({ row }) => (
      <div className="font-semibold">
        # {row.original.id?.slice(0,4)}
      </div>
    )
  },
  {
    accessorKey: 'type',
    header: 'Item Type',
    cell: () => (
      <>
        {/* {row.original.type === 'service' &&
          <Badge className="bg-amber-400 hover:bg-amber-500">
            Service
          </Badge>
        } */}
        <Badge className="bg-green-500 hover:bg-green-600">
            Product
        </Badge>
      </>
    )
  },
  {
    id: 'name',
    header: 'Item Name',
    cell: ({ row }) => (
      <>
        {
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
        }
      </>
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
    header: 'Quantity'
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