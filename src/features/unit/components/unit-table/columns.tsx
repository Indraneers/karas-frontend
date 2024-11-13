import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { Unit } from "@/types/unit";
import { ProductCell } from "../product-cell";
import { InventoryActions } from "@/components/inventory-actions";
import { deleteUnit } from "../../api/unit";
import { DeleteButton } from "@/components/delete-button";

export const columns: ColumnDef<Unit>[] = [
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
    accessorKey: 'productId',
    header: 'Product',
    cell: ({ row }) => (
      <ProductCell productId={row.getValue('productId')} />
    )
  },
  {
    accessorKey: 'name',
    header: 'Unit'
  },
  {
    accessorKey: 'sku',
    header: 'SKU'
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => `$ ${ (row.getValue('price') as number / 100).toFixed(2) }`
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const unit = row.original;
      return (
        <DeleteButton 
          id={unit.id}
          type="units"
          handleDelete={deleteUnit}
        />
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const unit = row.original;
      return (
        <InventoryActions
          id={unit.id}
          type="units"
          handleDelete={deleteUnit}
        />
      );
    }
  }
];