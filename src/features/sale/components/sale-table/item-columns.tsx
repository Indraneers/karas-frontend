import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Currency } from "@/components/currency";
import { calculateUnitItemTotalCost } from "../../utils/sale";
import { Item } from "../../types/item";
import { ProductIdentifier } from "@/features/product/components/product-identifier";
import { ItemQuantity } from "@/components/item-quantity";

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
      <Badge variant='info-green'>
          Product
      </Badge>
    )
  },
  {
    id: 'name',
    header: 'Item Name',
    cell: ({ row }) => (
      <div>
        {row.original.unit.product.name}  <ProductIdentifier className="font-light text-xs" identifier={row.original.unit.product.identifier} />
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
    header: () => 'Quantity',
    cell: ({ row }) => <ItemQuantity item={row.original} />
  },
  {
    accessorKey: 'Total',
    header: 'Total ($)',
    cell: ({ row }) => (
      <div className="font-medium text-green-700">
        <Currency amount={
          calculateUnitItemTotalCost(
            row.original.price,
            row.original.discount,
            row.original
          )
        } />
      </div>
    )
  }
];