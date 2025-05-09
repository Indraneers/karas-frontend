import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "../../types/customer";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomerActions } from "../customer-actions";
import { deleteCustomer } from "../../api/customer";

export const columns: ColumnDef<Customer>[] = [
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
    header: 'Customer Name'
  },
  {
    accessorKey: 'contact',
    header: 'Phone Number'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 100,
    cell: ({ row }) => <CustomerActions id={row.original.id || ''} handleDelete={deleteCustomer} />
  }
];