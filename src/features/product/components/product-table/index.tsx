import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Product } from "@/features/product/types/product";


interface ProductTablePage {
  className?: string;
  products: Product[];
  isLoading?: boolean;
}

export function ProductTable({ isLoading, className, products }: ProductTablePage) {
  return (
    <div className={cn(className)}>
      <DataTablePagination isLoading={isLoading} columns={columns} data={products} />
    </div>
  );
}