import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { Product } from "@/types/product";
import { CategoryCell } from "../category-cell";
import { deleteProduct } from "../../api/product";
import { InventoryActions } from "@/components/inventory-actions";
import { DeleteButton } from "@/components/delete-button";

export const columns: ColumnDef<Product>[] = [
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
    header: 'Product'
  },
  {
    accessorKey: 'categoryId',
    header: 'Category',
    cell: ({ row }) => (
      <CategoryCell categoryId={row.getValue('categoryId')} />
    )
  },
  {
    accessorKey: 'unitCount',
    header: 'Unit Quantity'
  },
  {
    id: "delete",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DeleteButton 
          id={product.id}
          type="products"
          handleDelete={deleteProduct}
        />
      );
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <InventoryActions
          id={product.id}
          type="products"
          handleDelete={deleteProduct}
        />
      );
    }
  }
];