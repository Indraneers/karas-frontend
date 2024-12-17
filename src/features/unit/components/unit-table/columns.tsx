import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { Unit } from "@/features/unit/types/unit";
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
    accessorKey: 'name',
    header: 'Unit',
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'productId',
    header: 'Product',
    cell: ({ row }) => (
      <ProductCell productId={row.getValue('productId')} />
    )
  },
  {
    accessorKey: 'sku',
    header: 'SKU'
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => `$ ${ row.getValue('price') }`
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    id: "actions",
    header: "Actions",
    size: 125,
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