import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/product";


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
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}