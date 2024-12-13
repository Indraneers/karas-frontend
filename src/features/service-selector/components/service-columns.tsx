import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ServiceEditable } from "./service-editable";
import { usePosStore } from "@/features/pos/store/pos";
import { ServiceSelectorItem } from "../types/service-selector-item";

export const ServiceColumns: ColumnDef<ServiceSelectorItem>[] = [
  {
    id: 'select',
    header: function CheckboxHeaderCell({ table }) {
      const { services, addService, removeService } = usePosStore();
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            if (value) {
              services.forEach((s) => addService(s.service.id));
            }
            else {
              services.forEach((s) => removeService(s.service.id));
            }
          }}
          aria-label="Select all"
        />
      );
    },
    cell: function CheckboxDataCell ({ row }) {
      const { addService, removeService } = usePosStore();
      const service = row.original;
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            if (value) {
              addService(service.service.id);
            }
            else {
              removeService(service.service.id);
            }
          }}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'service',
    header: 'Services Check',
    cell: ({ row }) => <div>{row.original.service.name}</div>
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ getValue, row }) => 
      <ServiceEditable 
        id={row.original.service.id}
        value={getValue() as string}
        accessorKey='price'
      />
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
    cell: ({ getValue, row }) => 
      <ServiceEditable 
        id={row.original.service.id}
        value={getValue() as string}
        accessorKey='discount'
      />
  }
];