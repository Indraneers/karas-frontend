import { ColumnDef } from "@tanstack/react-table";
import { ItemTypes } from "@/features/sale/types/item";
import { ProductCell } from "@/features/sale/components/product-cell";
import { Currency } from "@/components/currency";
import { calculateTotalCost } from "@/features/sale/utils/sale";

export const columns: ColumnDef<ItemTypes>[] = [
  {
    id: 'no',
    header: 'N.O',
    cell: ({ row }) => row.index + 1
  },
  {
    accessorKey: 'type',
    header: 'Item Type',
    cell: ({ row }) => (
      <>
        {row.original.type === 'service' &&
            'Service'
        }
        {row.original.type === 'unit' &&
            'Product'
        }
      </>
    )
  },
  {
    id: 'name',
    header: 'Item/Service Name',
    size: 400,
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
    header: 'Qty'
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