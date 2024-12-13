import { ColumnDef } from "@tanstack/react-table";
import { Sale } from "../../types/sale";
import { format } from 'date-fns';
import { Checkbox } from "@/components/ui/checkbox";
import { getSubtotal } from "../../utils/sale";

export const columns: ColumnDef<Sale>[] = [
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
    id: 'subtotal',
    header: 'Subtotal ($)',
    cell: ({ row }) => {
      const { items } = row.original;
      
      const itemUnit = items.filter((i) => i.type === 'unit');
      const services = items.filter((i) => i.type === 'service');

      return getSubtotal({ items: itemUnit, services });
    }
  },
  {
    id: 'discount',
    header: 'Discount ($)',
    cell: ({ row }) => `$ ${ (Number(row.original.discount)/100).toFixed(2) }`
  },
  {
    id: 'total',
    header: 'Total ($)',
    cell: ({ row }) => {
      const { items } = row.original;
      
      const itemUnit = items.filter((i) => i.type === 'unit');
      const services = items.filter((i) => i.type === 'service');

      return getSubtotal({ items: itemUnit, services }) - Number(row.original.discount)/100;
    }
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => format(row.getValue('dueDate'), 'do MMMM, yyyy (hh:mm a)')
  },
  {
    accessorKey: 'created',
    header: 'Created Date',
    cell: ({ row }) => format(row.getValue('dueDate'), 'do MMMM, yyyy (hh:mm a)')
  }
];