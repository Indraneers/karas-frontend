import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Subcategory } from "../../types/subcategory";
import { deleteSubcategory } from "../../api/subcategory";
import { Badge } from "@/components/ui/badge";
import { SubcategoryActions } from "../subcategory-actions";

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
    accessorKey: 'category.name',
    header: 'Category',
    cell: ({ row }) => <Badge variant='outline' className="border-accent text-accent">{row.original.category.name}</Badge>
  },
  {
    accessorKey: 'productCount',
    size: 125,
    header: () => <div className="min-w-[250px]">Product Count</div>
  },
  {
    id: "actions",
    size: 10,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <SubcategoryActions
          value={row.original}
          handleDelete={deleteSubcategory}
        />
      );
    }
  }
];