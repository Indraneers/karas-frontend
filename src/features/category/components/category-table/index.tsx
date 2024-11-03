import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { InventoryDataTable } from "../../../../components/inventory-data-table";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../api/category";

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
      <InventoryDataTable columns={columns} data={data || []} />
    </div>
  );
}