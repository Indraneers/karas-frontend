import { ColumnDef } from "@tanstack/react-table";
import { Sale } from "../../types/sale";
import { format } from 'date-fns';
import { Checkbox } from "@/components/ui/checkbox";
import { getSubtotal, getTotal } from "../../utils/sale";
import { CustomLink } from "@/components/link";
import { StatusBadge } from "../status-badge";
import { SaleActions } from "../sale-actions";
import { deleteSale } from "../../api/sale";
import { Currency } from "@/components/currency";

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: 'id',
    header: 'Invoice ID',
    cell:({ row }) => (<div className="font-medium text-primary hover:underline">{row.original.id}</div>)
  },
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
    accessorKey: 'customer.name',
    header: 'Customer',
    cell: ({ row }) => (
      <CustomLink to={'/customers/' + row.original.customer.id || ''}>
        {row.original.customer.name}
      </CustomLink>
    )
  },
  {
    accessorKey: 'vehicle',
    header: 'Vehicle',
    cell: ({ row }) => (
      <CustomLink to={'/vehicles/' + row.original.vehicle.id}>
        {row.original.vehicle.makeAndModel} <span className="font-medium">({row.original.vehicle.plateNumber})</span>
      </CustomLink>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;

      return <StatusBadge status={status} />;
    }
  },
  {
    id: 'subtotal',
    header: 'Subtotal ($)',
    cell: ({ row }) => {
      const { items } = row.original;
      // const services = items.filter((i) => i.type === 'service');

      return (
        <div className="font-medium text-green-600">
          <Currency amount={
            getSubtotal({ 
              items, 
              maintenanceServices: row.original.maintenance.services
            })
          } />
        </div>
      );
    }
  },
  {
    id: 'discount',
    header: 'Discount ($)',
    cell: ({ row }) => (
      <div className="font-medium text-primary">
        <Currency amount={row.original.discount} />
      </div>
    )
  },
  {
    id: 'total',
    header: 'Total ($)',
    cell: ({ row }) => {
      const { items } = row.original;
    
      // const services = items.filter((i) => i.type === 'service');
      const total = getTotal({ 
        items, 
        maintenanceServices: row.original.maintenance.services,
        discount: row.original.discount 
      });

      return (
        <div className="font-medium text-green-700">
          <Currency amount={total} />
        </div>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date',
    cell: ({ row }) => (
      <div>
        {format(row.getValue('createdAt'), 'do MMM yyyy (hh:mm aa)')}
      </div>
    )
  },
  {
    accessorKey: 'user.username',
    header: 'Sale By',
    cell: ({ row }) => (
      <CustomLink to={'/users/' + row.original.user.id}>
        {row.original.user.username}
      </CustomLink>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <SaleActions 
          id={row.original.id || ''}
          handleDelete={deleteSale}
        />
      );
    }
  }
];