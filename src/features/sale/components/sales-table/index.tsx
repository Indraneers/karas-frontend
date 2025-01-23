import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "../../api/sale";
import { convertSaleResponseDtoToSale } from "../../utils/sale";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Sale } from "../../types/sale";
import { PageLoading } from "@/components/page-loading";

export function SalesTable({ className } : { className?: string}) {
  const navigate = useNavigate();
  const { isError, isLoading, data } = useQuery({
    queryKey: ['sales'],
    queryFn: () => getSales()
  });

  if (isError) {
    return 'error';
  }


  const sales = data ? data.map(s => convertSaleResponseDtoToSale(s)) : [];

  return (
    <div className={cn(className)}>
      {
        isLoading &&
        <PageLoading />
      }
      {!isLoading && 
        <DataTablePagination 
          onRowClick={(data: Sale) => navigate({ to: '/sales/' + data.id })}
          columns={columns} 
          data={sales || []} 
        />
      }
    </div>
  );
}