import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Currency } from "@/components/currency";
import { calculateServiceItemTotalCost } from "../../utils/sale";
import { MaintenanceService } from "@/features/maintenance/types/maintenance-service";

export const serviceColumns: ColumnDef<MaintenanceService>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="font-semibold"> Item ID</div>,
    cell: ({ row }) => (
      <div className="font-semibold">
        # {row.original.id?.slice(0,4)}
      </div>
    )
  },
  {
    accessorKey: 'type',
    header: 'Item Type',
    cell: () => (
      <Badge variant='info-blue'>
            Service
      </Badge>
    )
  },
  {
    id: 'name',
    header: 'Item Name',
    cell: ({ row }) => (
      <>
        {
          <div>
            {row.original.service.name}
            {' '}
            ({ row.original.service.name })
          </div>
        }
      </>
    )
  },
  {
    accessorKey: 'price',
    header: 'Price ($)',
    cell: ({ row }) => (
      <div className="text-green-600">
        <Currency amount={row.original.price} />
      </div>
    )
  },
  {
    accessorKey: 'discount',
    header: 'Discount ($)',
    cell: ({ row }) => (
      <div className="text-primary">
        <Currency amount={row.original.discount} />
      </div>
    )
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity'
  },
  {
    accessorKey: 'Total',
    header: 'Total ($)',
    cell: ({ row }) => (
      <div className="font-medium text-green-700">
        <Currency amount={
          calculateServiceItemTotalCost(
            row.original.price,
            row.original.discount
          )
        } />
      </div>
    )
  }
];