import { ColumnDef } from "@tanstack/react-table";
import { Vehicle } from "../../dto/vehicle";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CustomLink } from "@/components/link";
import { VehicleActions } from "../vehicle-actions";
import { deleteVehicle } from "../../api/vehicle";

export const columns: ColumnDef<Vehicle>[] = [
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
    accessorKey: 'plateNumber',
    header: 'Plate Number',
    cell: ({ row }) => <div className="font-semibold text-primary">{row.original.plateNumber}</div> 
  },
  {
    accessorKey: 'makeAndModel',
    header: 'Make & Model'
  },
  {
    accessorKey: 'mileage',
    header: 'Mileage',
    cell: ({ row }) => <Badge>{row.original.mileage} km</Badge> 
  },
  {
    accessorKey: 'vinNo',
    header: 'VIN N.O'
  },
  {
    accessorKey: 'customer.name',
    header: 'Owner',
    cell: ({ row }) => (
      <CustomLink to={'/customers/edit/' + row.original.customer.id}>{row.original.customer.name}</CustomLink>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 100,
    cell: ({ row }) => <VehicleActions id={row.original.id || ''} handleDelete={deleteVehicle} />
  }
];