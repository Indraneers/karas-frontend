import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { Product } from "@/features/product/types/product";
import { deleteProduct } from "../../api/product";
import { InventoryActions } from "@/components/inventory-actions";
import { Badge } from "@/components/ui/badge";

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
    header: 'Product Name',
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'identifier',
    header: 'Identifier'
  },
  {
    accessorKey: 'subcategory.name',
    header: 'Category',
    cell: ({ row }) => (
      <Badge variant='outline' className="border-accent text-accent">
        {row.original.subcategory.name}
      </Badge>
    )
  },
  {
    accessorKey: 'variable',
    header: 'Type',
    cell: ({ row }) => (
      <>
        { row.original.variable &&
          <Badge className="bg-amber-500 hover:bg-amber-600">Variable</Badge>
        }
        { !row.original.variable &&
          <Badge className="bg-green-500 hover:bg-green-600">Countable</Badge>
        }
      </>
    )
  },
  {
    accessorKey: 'baseUnit',
    header: 'Base Unit',
    cell: ({ row }) => (
      <>
        {row.original.variable && 
          <Badge className="border-primary text-primary" variant='outline'>
            1{row.original.baseUnit}
          </Badge>
        }
        {
          !row.original.variable && "N/A"
        }
      </>
    )
  },
  {
    accessorKey: 'unitCount',
    header: 'Unit Quantity'
  },
  {
    id: "actions",
    header: "Actions",
    size: 125,
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