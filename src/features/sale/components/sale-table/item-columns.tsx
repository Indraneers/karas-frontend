import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Currency } from "@/components/currency";
import { calculateTotalCost } from "../../utils/sale";
import { Item } from "../../types/item";

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
        {/* {row.original.type === 'service' && row.original.service?.name
        } */}
        {
          <div>
            {row.original.unit.product.name}
            {' '}
            ({ row.original.unit?.name })
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