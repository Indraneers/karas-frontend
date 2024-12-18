import { ColumnDef } from "@tanstack/react-table";
import { ItemTypes } from "../../types/item";
import { Badge } from "@/components/ui/badge";
import { ProductCell } from "../product-cell";
import { Currency } from "@/components/currency";
import { calculateTotalCost } from "../../utils/sale";

export const columns: ColumnDef<ItemTypes>[] = [
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
    cell: ({ row }) => (
      <>
        {row.original.type === 'service' &&
          <Badge className="bg-amber-400 hover:bg-amber-500">
            Service
          </Badge>
        }
        {row.original.type === 'unit' &&
          <Badge className="bg-green-500 hover:bg-green-600">
            Product
          </Badge>
        }
      </>
    )
  },
  {
    id: 'name',
    header: 'Item Name',
    cell: ({ row }) => (
      <>
        {row.original.type === 'service' && row.original.service?.name
        }
        {row.original.type === 'unit' && 
          <div>
            <ProductCell productId={row.original.unit?.productId || ''} />
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