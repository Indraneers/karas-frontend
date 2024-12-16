import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { Unit } from "@/types/unit";
import { ProductCell } from "../product-cell";
import { InventoryActions } from "@/components/inventory-actions";
import { deleteUnit } from "../../api/unit";

export const columns: ColumnDef<Unit>[] = [
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
    accessorKey: 'productId',
    header: 'Product',
    cell: ({ row }) => (
      <ProductCell productId={row.getValue('productId')} />
    )
  },
  {
    accessorKey: 'name',
    header: 'Unit',
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>
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
    id: "actions",
    header: () => <div className="text-right pr-2">Actions</div>,
    cell: ({ row }) => {
      const unit = row.original;
      return (
        <InventoryActions
          id={unit.id || ''}
          type="units"
          handleDelete={deleteUnit}
        />
      );
    }
  }
];