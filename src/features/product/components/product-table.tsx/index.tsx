import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { InventoryDataTable } from "../../../../components/inventory-data-table";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/product";


interface ProductTablePage {
  className?: string;
}

export function ProductTable({ className }: ProductTablePage) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['units'],
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
      <InventoryDataTable columns={columns} data={data || []} />
    </div>
  );
}