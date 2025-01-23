import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { usePosStore } from "@/features/pos/store/pos";
import { ServiceSelectorItem } from "../types/service-selector-item";
import { convertCurrencyToInputString } from "@/lib/currency";
import { useEffect } from "react";

export const ServiceColumns: ColumnDef<ServiceSelectorItem>[] = [
  {
    id: 'select',
    header: function CheckboxHeaderCell({ table }) {
      const { serviceSelectorItems, addService, removeService } = usePosStore();
      const isAllChecked = !serviceSelectorItems.find((s) => !s.checked);
      const isSomeChecked = !!serviceSelectorItems.find((s) => s.checked);
      return (
        <Checkbox
          checked={
            isAllChecked ||
            (isSomeChecked && "indeterminate")
          }
          onCheckedChange={(value) => {
            if (value) {
              serviceSelectorItems.forEach((s) => addService(s.service.id));
            }
            else {
              serviceSelectorItems.forEach((s) => removeService(s.service.id));
            }
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      );
    },
    cell: function CheckboxDataCell ({ row }) {
      const { addService, removeService } = usePosStore();
      const service = row.original;
      const isChecked = row.original.checked || false;

      useEffect(() => {
        if (row.getIsSelected() !== isChecked) {
          row.toggleSelected(isChecked);
        }
      }, [isChecked, row]);

      return (
        <Checkbox
          checked={isChecked}
          onCheckedChange={(value) => {
            if (value) {
              addService(service.service.id);
            }
            else {
              removeService(service.service.id);
            }

            row.toggleSelected(!isChecked);
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
    header: 'Services Name',
    cell: ({ row }) => <div className="font-medium">{row.original.service.name}</div>
  },
  {
    accessorKey: 'price',
    header: 'Original Price',
    size: 100,
    cell: ({ row }) => <div className="text-muted-foreground">$ {convertCurrencyToInputString(row.original.price)}</div>
  }
];