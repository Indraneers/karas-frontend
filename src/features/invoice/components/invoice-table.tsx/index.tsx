import { columns } from "./columns";
import { Sale } from "@/features/sale/types/sale";
import { ItemsDataTable } from "@/features/sale/components/items-table/items-data-table";
import { cn } from "@/lib/utils";

export function InvoiceTable({ sale, className } : { sale: Sale, className?: string }) {
  return (
    <div className={cn([
      'w-full',
      className
    ])}>
      <ItemsDataTable
        columns={columns}
        sale={sale}
      />
    </div>
  );
}