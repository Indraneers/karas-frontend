import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { AutoServiceItem } from "../types/auto-service-item";
import { ServiceEditable } from "./service-editable";
import { usePosStore } from "../store/pos";

export const ServiceColumns: ColumnDef<AutoServiceItem>[] = [
  {
    id: 'select',
    header: function CheckboxHeaderCell({ table }) {
      const { services, setServices } = usePosStore();
      return (
        <Checkbox
          className="bg-background w-5 h-5"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setServices(services.map((s) => ({ ...s, checked: value })  ));
          }}
          aria-label="Select all"
        />
      );
    },
    cell: function CheckboxDataCell ({ row }) {
      const { services, setServices } = usePosStore();
      const serviceId = row.original.autoService.id;
      return (
        <Checkbox
          className="!w-[20px] !h-[20px]"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setServices(services.map((s) => {
              if (s.autoService.id === serviceId) {
                return {
                  ...s,
                  checked: value
                };
              }

              return s;
            }));
          }}
          aria-label="Select row"
        />
      );
    },
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
        value={getValue() as string}
        accessorKey='price'
      />
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
    cell: ({ getValue, row }) => 
      <ServiceEditable 
        id={row.original.autoService.id}
        value={getValue() as string}
        accessorKey='discount'
      />
  }
];