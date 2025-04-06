import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { getSales } from "../../api/sale";
import { convertSaleResponseDtoToSale } from "../../utils/sale";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Sale } from "../../types/sale";
import { PageLoading } from "@/components/page-loading";
import { useSearchPagination } from "@/hooks/use-search-pagination";

export function SalesTable({ className } : { className?: string}) {
  const navigate = useNavigate();
  const { isLoading, data, ...paginationDetail } = 
  useSearchPagination({ 
    key: 'sales', 
    getEntity: getSales 
  });

  const sales = data ? data.content.map(s => convertSaleResponseDtoToSale(s)) : [];

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
          data={sales}
          paginationDetail={paginationDetail}
        />
      }
    </div>
  );
}