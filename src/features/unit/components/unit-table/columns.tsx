import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { Unit } from "@/types/unit";
import { DeleteButton } from "@/components/delete-button";
import { ProductCell } from "../product-cell";

export const columns: ColumnDef<Unit>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className="w-5 h-5"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div className="place-content-center grid">      
        <Checkbox
          className="flex !w-[20px] !h-[20px]"
          iconClassName="w-[20px] h-[20px]"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'productId',
    header: 'Product',
    cell: ({ row }) => (
      <ProductCell productId={row.getValue('productId')} />
    )
  },
  {
    accessorKey: 'name',
    header: 'Unit'
  },
  {
    accessorKey: 'sku',
    header: 'SKU'
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    accessorKey: 'delete',
    header: 'Delete',
    cell: () => (
      <DeleteButton />
    )
  }
];