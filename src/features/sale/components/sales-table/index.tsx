import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { getSales } from "../../api/sale";
import { convertSaleResponseDtoToSale } from "../../utils/sale";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Sale } from "../../types/sale";
import { PageLoading } from "@/components/page-loading";
import { useSearchPagination } from "@/hooks/use-search-pagination";
import { useState } from "react";
import { Page } from "@/types/page";
import { APIQuery } from "@/types/query";
import { SaleResponseDto } from "../../types/sale.dto";

export function SalesTable({ className, key = 'sales',getSalesFn = getSales } : { 
  className?: string, 
  key?: string,
  getSalesFn?: (q: APIQuery) => Promise<Page<SaleResponseDto>>
}) {
  const navigate = useNavigate();
  const { isLoading, data, ...paginationDetail } = 
    useSearchPagination({ 
      key, 
      getEntity: getSalesFn
    });

  const sales = data ? data.content.map(s => convertSaleResponseDtoToSale(s)) : [];

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  return (
    <div className={cn(className)}>
      {
        isLoading &&
        <PageLoading />
      }
      {!isLoading && 
        <DataTablePagination 
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          onRowClick={(data: Sale) => navigate({ to: '/sales/' + data.id })}
          columns={columns} 
          data={sales}
          paginationDetail={paginationDetail}
        />
      }
    </div>
  );
}