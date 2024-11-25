import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { AutoServiceItem } from "../types/auto-service-item";
import { ServiceEditable } from "./service-editable";

export const ServiceColumns: ColumnDef<AutoServiceItem>[] = [
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
    accessorKey: 'autoService',
    header: 'Services Check',
    cell: ({ row }) => <div>{row.original.autoService.name}</div>
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ getValue, row }) => 
      <ServiceEditable 
        id={row.original.autoService.id}
        value={getValue() ? (Number(getValue()) / 100) : undefined}
        accessorKey='price'
      />
  }
];