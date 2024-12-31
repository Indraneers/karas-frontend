import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Product } from "@/types/product";


interface ProductTablePage {
  className?: string;
  products: Product[]
}

export function ProductTable({ className, products }: ProductTablePage) {
  return (
    <div className={cn(className)}>
      <DataTablePagination columns={columns} data={products} />
    </div>
  );
}