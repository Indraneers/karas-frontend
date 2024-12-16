import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { Category } from "@/types/category";
import { deleteCategory } from "../../api/category";
import { InventoryActions } from "@/components/inventory-actions";
import { DeleteButton } from "@/components/delete-button";

export const columns: ColumnDef<Category>[] = [
  {
    id: 'select',
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
    header: () => <div className="min-w-[250px]">Product Count</div>
  },
  {
    id: "delete",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <DeleteButton 
          id={category.id} 
          type="categories"
          handleDelete={deleteCategory}
        />
      );
    }
  },
  {
    id: "actions",
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