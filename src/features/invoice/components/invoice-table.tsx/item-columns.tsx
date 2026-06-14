import { ColumnDef } from "@tanstack/react-table";
import { Currency } from "@/components/currency";
import { calculateUnitItemTotalCost } from "@/features/sale/utils/sale";
import { Item } from "@/features/sale/types/item";
import { ProductIdentifier } from "@/features/product/components/product-identifier";
import { ItemQuantity } from "@/components/item-quantity";

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
        <span className="inline-flex gap-1 w-[350px]">
          <span>
            {row.original.unit.product.name} <ProductIdentifier identifier={row.original.unit.product.identifier} />
          </span>
        </span>
      </div>
    )
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-right">ថ្លៃឯកតា ($)<br/>Price ($)</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums text-neutral-900 text-nowrap">
        <Currency amount={row.original.price} />
      </div>
    )
  },
  {
    accessorKey: 'discount',
    header: () => <div className="text-right text-nowrap">បញ្ចុះតម្លៃ ($)<br/>Discount ($)</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums text-red-600 text-nowrap">
        {row.original.discount > 0 ? "−" : ""}
        <Currency amount={row.original.discount} />
      </div>
    )
  },
  {
    accessorKey: 'quantity',
    header: () => <div className="text-right text-nowrap">បរិមាណ<br/>Qty</div>,
    cell: ({ row }) => <div className="text-right text-neutral-900"><ItemQuantity item={row.original} /></div>
  },
  {
    accessorKey: 'Total',
    header: () => <div className="text-right text-nowrap">ថ្លៃទំនិញ ($)<br/>Total ($)</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums text-neutral-900 text-nowrap">
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