import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { InventoryActions } from "@/components/inventory-actions";
import { Subcategory } from "../../types/subcategory";
import { deleteSubcategory } from "../../api/subcategory";
import { Badge } from "@/components/ui/badge";
import { CategoryCell } from "@/features/category/components/category-cell";

export const columns: ColumnDef<Subcategory>[] = [
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
    header: 'Name',
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'categoryId',
    header: 'Category',
    cell: ({ row }) => 
      <Badge variant='outline' className="border-accent text-accent">
        <CategoryCell categoryId={row.original.categoryId} />
      </Badge>
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
          type="subcategories"
          handleDelete={deleteSubcategory}
        />
      );
    }
  }
];