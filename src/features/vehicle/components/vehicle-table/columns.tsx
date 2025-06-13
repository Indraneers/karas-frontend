import { ColumnDef } from "@tanstack/react-table";
import { Vehicle } from "../../types/vehicle";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CustomLink } from "@/components/link";
import { VehicleActions } from "../vehicle-actions";
import { deleteVehicle } from "../../api/vehicle";
import { vehicleTypeList } from "../../utils/vehicle";
import { VehicleIcon } from "../vehicle-icon";

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
    accessorKey: 'Vehicle Type',
    header: 'Vehicle Type',
    cell: ({ row }) => {
      const vehicleType = vehicleTypeList.find(t => t.value === row.original.vehicleType) || vehicleTypeList[0];
      return (
        <div className="flex items-center gap-2">
          <VehicleIcon icon={vehicleType.icon} /> {vehicleType.content}
        </div>
      );
    }
  },
  {
    accessorKey: 'mileage',
    header: 'Mileage',
    cell: ({ row }) => <Badge variant='info-primary'>{row.original.mileage} km</Badge> 
  },
  {
    accessorKey: 'vinNo',
    header: 'VIN N.O'
  },
  {
    accessorKey: 'customer.name',
    header: 'Owner',
    cell: ({ row }) => (
      <CustomLink to={'/customers/edit/' + row.original.customer?.id || ''}>{row.original.customer?.name}</CustomLink>
    )
  },
  {
    id: 'actions',
    size: 10,
    cell: ({ row }) => <VehicleActions value={row.original} handleDelete={deleteVehicle} />
  }
];