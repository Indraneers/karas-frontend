import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { DeleteButton } from "@/components/delete-button";
import { Category } from "@/types/category";

export const columns: ColumnDef<Category>[] = [
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
    accessorKey: 'name',
    header: 'Category'
  },
  {
    accessorKey: 'productCount',
    header: 'Product Quantity'
  },
  {
    accessorKey: 'delete',
    header: 'Delete',
    cell: () => (
      <DeleteButton />
    )
  }
];