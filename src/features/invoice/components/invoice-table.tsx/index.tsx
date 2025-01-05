import { itemColumns } from "./item-columns";
import { Sale } from "@/features/sale/types/sale";
import { ItemServiceDataTable } from "@/features/sale/components/item-service-data-table";
import { cn } from "@/lib/utils";
import { serviceColumns } from "./service-columns";

export function InvoiceTable({ sale, className } : { sale: Sale, className?: string }) {
  return (
    <div className={cn([
      'w-full',
      className
    ])}>
      <ItemServiceDataTable 
        sale={sale}
        itemColumns={itemColumns}
        serviceColumns={serviceColumns}
      />
    </div>
  );
}