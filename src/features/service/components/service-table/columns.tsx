import { ColumnDef } from "@tanstack/react-table";
import { Service } from "../../types/service";
import { Checkbox } from '@/components/ui/checkbox';
import { convertCurrencyToString } from "@/lib/currency";
import { ServiceActions } from "../service-actions";
import { deleteAutoServices } from "../../api/auto-services";

export const columns: ColumnDef<Service>[] = [
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
    header: 'Service Name'
  },
  {
    accessorKey: 'originalPrice',
    header: 'Price',
    cell: ({ row }) => `$ ${ convertCurrencyToString(row.original.originalPrice) }`
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 100,
    cell: ({ row }) => <ServiceActions id={row.original.id} handleDelete={deleteAutoServices} />
  }
];