import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/product";
import { DataTablePagination } from "@/components/data-table-pagination";


interface ProductTablePage {
  className?: string;
}

export function ProductTable({ className }: ProductTablePage) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => await getProducts()
  });

  if (isError) {
    return 'error';
  }

  if (isLoading) {
    return 'loading';
  }

  return (
    <div className={cn(className)}>
      <DataTablePagination columns={columns} data={data || []} />
    </div>
  );
}