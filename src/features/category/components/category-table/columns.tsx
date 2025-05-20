import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/features/category/types/category";
import { deleteCategory } from "../../api/category";
import { CategoryActions } from "../category-actions";

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
    accessorKey: 'subcategoryCount',
    size: 125,
    header: () => <div className="min-w-[250px]">Subcategory Count</div>
  },
  {
    id: "actions",
    size: 10,
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <CategoryActions
          id={category.id} 
          handleDelete={deleteCategory}
        />
      );
    }
  }
];