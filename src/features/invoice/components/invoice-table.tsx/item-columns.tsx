import { ColumnDef } from "@tanstack/react-table";
import { Currency } from "@/components/currency";
import { calculateUnitItemTotalCost } from "@/features/sale/utils/sale";
import { Item } from "@/features/sale/types/item";
import { ProductIdentifier } from "@/features/product/components/product-identifier";
import { convertBaseQuantityToQuantity } from "@/features/unit/util/convert";

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
      <div>
        <span className="inline-flex flex-nowrap gap-1">
          <span>
            {row.original.unit.product.name} <ProductIdentifier identifier={row.original.unit.product.identifier} />
          </span>
        </span>
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
    cell: ({ row }) => (
      <div>{convertBaseQuantityToQuantity(row?.original.unit.toBaseUnit, row.original.quantity)}</div>
    )
  },
  {
    accessorKey: 'Total',
    header: () => <div>ថ្លៃទំនិញ ($)<br></br>Total ($)</div>,
    cell: ({ row }) => (
      <div className="font-medium text-green-700">
        <Currency amount={
          calculateUnitItemTotalCost(
            row.original.price,
            row.original.discount,
            row.original.quantity,
            row.original.unit.toBaseUnit
          )
        } />
      </div>
    )
  }
];