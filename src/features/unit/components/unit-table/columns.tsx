import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Unit } from "@/features/unit/types/unit";
import { deleteUnit } from "../../api/unit";
import { ProductCell, ToBaseUnitCell, PriceCell, UnitQuantityCell } from "../unit-table";
import { ProductTypeBadge } from "@/features/product/components/product-type-badge";
import { UnitActions } from "../unit-actions";

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
    accessorKey: 'product',
    header: 'Product',
    cell: ({ row }) => (
      <ProductCell product={row.original.product} />
    )
  },
  {
    accessorKey: 'product.variable',
    header: 'Type',
    cell: ({ row }) => (
      <ProductTypeBadge variable={row.original.product.variable} />
    )
  },
  {
    accessorKey: 'toBaseUnit',
    header: 'Base Unit',
    cell: ({ row }) => 
      <ToBaseUnitCell 
        product={row.original.product}
        toBaseUnit={row.original.toBaseUnit} 
      />
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => 
      <PriceCell 
        product={row.original.product}
        price={row.original.price}
      />
  },
  {
    accessorKey: 'quantity',
    header: 'Unit Quantity',
    cell: ({ row }) => 
      <UnitQuantityCell
        product={row.original.product}
        quantity={row.original.quantity} 
        toBaseUnit={row.original.toBaseUnit} 
      />
  },
  {
    id: "actions",
    size: 10,
    cell: ({ row }) => {
      const unit = row.original;
      return (
        <UnitActions
          id={unit.id || ''}
          handleDelete={deleteUnit}
        />
      );
    }
  }
];