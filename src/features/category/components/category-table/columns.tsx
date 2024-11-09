import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { Category } from "@/types/category";
import { CategoryActions } from "../category-actions";
import { DeleteCategoryButton } from "../delete-category-btn";

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
      <Checkbox
        className="!w-[20px] !h-[20px]"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
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
    accessorKey: 'id',
    header: 'Delete',
    cell: ({ row }) => (
      <DeleteCategoryButton categoryId={row.getValue('id')} />
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <CategoryActions categoryId={category.id} />
      );
    }
  }
];