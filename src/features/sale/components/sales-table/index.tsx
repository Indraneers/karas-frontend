import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "../../api/sale";
import { convertSaleResponseDtoToSale } from "../../utils/sale";
import { cn } from "@/lib/utils";

export function SalesTable({ className } : { className?: string}) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['sales'],
    queryFn: () => getSales()
  });

  if (isError) {
    return 'error';
  }

  if (isLoading) {
    return 'loading';
  }

  const sales = data?.map(s => convertSaleResponseDtoToSale(s));

  return (
    <div className={cn(className)}>
      <DataTablePagination columns={columns} data={sales || []} />
    </div>
  );
}