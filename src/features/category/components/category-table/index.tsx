import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/category";
import { DataTablePagination } from "@/components/data-table-pagination";

interface CategoryTablePage {
  className?: string;
}

export function CategoryTable({ className }: CategoryTablePage) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getCategories()
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