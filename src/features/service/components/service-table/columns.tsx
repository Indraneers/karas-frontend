import { ColumnDef } from "@tanstack/react-table";
import { Service } from "../../types/service";
import { Checkbox } from '@/components/ui/checkbox';
import { ServiceActions } from "../service-actions";
import { deleteAutoService } from "../../api/auto-services";
import { Currency } from "@/components/currency";

export const columns: ColumnDef<Service>[] = [
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
    header: 'Service Name',
    size: 100
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => <Currency amount={row.original.price} />,
    size: 500
  },
  {
    id: 'actions',
    size: 10,
    cell: ({ row }) => <ServiceActions id={row.original.id} handleDelete={deleteAutoService} />
  }
];