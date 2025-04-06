import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Product } from "@/features/product/types/product";
import { PaginationDetail } from "@/types/pagination";


interface ProductTablePage {
  className?: string;
  products: Product[];
  isLoading?: boolean;
  paginationDetail: PaginationDetail;
}

export function ProductTable({ isLoading, className, products, paginationDetail }: ProductTablePage) {
  return (
    <div className={cn(className)}>
      <DataTablePagination isLoading={isLoading} columns={columns} data={products} paginationDetail={paginationDetail} />
    </div>
  );
}