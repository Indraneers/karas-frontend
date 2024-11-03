import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { Product } from "@/types/product";
import { CategoryCell } from "../category-cell";

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: 'categoryId',
    header: 'Category',
    cell: ({ row }) => (
      <CategoryCell categoryId={row.getValue('categoryId')} />
    )
  },
  {
    accessorKey: 'name',
    header: 'Product'
  },
  {
    accessorKey: 'unitCount',
    header: 'Unit Quantity'
  }
];