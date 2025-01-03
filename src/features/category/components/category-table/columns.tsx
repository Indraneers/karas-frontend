import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { Category } from "@/features/category/types/category";
import { InventoryActions } from "@/components/inventory-actions";
import { deleteCategory } from "../../api/category";

export const columns: ColumnDef<Category>[] = [
  {
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
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
    header: 'Category',
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'productCount',
    size: 125,
    header: () => <div className="min-w-[250px]">Product Count</div>
  },
  {
    id: "actions",
    size: 125,
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <InventoryActions 
          id={category.id} 
          type="categories"
          handleDelete={deleteCategory}
        />
      );
    }
  }
];