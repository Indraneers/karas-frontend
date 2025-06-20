import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { deleteSale, getSales, paySale } from "../../api/sale";
import { convertSaleResponseDtoToSale } from "../../utils/sale";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Sale } from "../../types/sale";
import { PageLoading } from "@/components/page-loading";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContextOption } from "@/types/context-options";
import { onClickUrl } from "@/lib/link";
import { BadgeDollarSign, Printer, Edit, Trash2 } from "lucide-react";
import { useSearchPagination } from "@/hooks/use-search-pagination";
import { SaleFilter } from "../../types/sale-filter";

function getQueryKeys(saleFilter: SaleFilter): string[] {
  const queryKeys = ['sales'];
  for (const val in saleFilter) {
    if (val in saleFilter) {
      queryKeys.push(String(val));
    }
  }

  return queryKeys;
}

export function SalesTable({ className, saleFilter } : { 
  className?: string,
  saleFilter: SaleFilter,
}) {
  const { isLoading, data, paginationDetail } = 
        useSearchPagination({ 
          key: getQueryKeys(saleFilter), 
          getEntity: getSales,
          query: saleFilter
        });
  const navigate = useNavigate();

  const sales = data ? data.content.map(s => convertSaleResponseDtoToSale(s)) : [];
  
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const queryClient = useQueryClient();
  const payMutation = useMutation({
    mutationFn: async (id: string) => paySale(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sales'] })
  });
  const deleteMutatation = useMutation({
    mutationFn: async (id: string) => deleteSale(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sales'] })
  });

  const contextOptions: ContextOption<Sale>[] = [
    {
      key: 1,
      onClick: (sale) => {
        payMutation.mutate(sale.id || '');
      },
      content: <><BadgeDollarSign /> Set Paid</>
    },
    {
      key: 2,
      onClick: (sale) => {
        (onClickUrl('/invoice/' + sale.id + '?print=true'))();
      },
      content: <><Printer /> Print</>
    },
    {
      key: 3,
      onClick: (sale) => {
        navigate({ to: '/sales/edit/' + sale.id });
      },
      content: <><Edit /> Edit</>
    },
    {
      key: 4,
      onClick: (sale) => {
        deleteMutatation.mutate(sale.id || '');
      },
      content: <><Trash2 /> Delete</>
    }
  ];


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
          contextOptions={contextOptions}
          contextLabel="Sales Actions"
        />
      }
    </div>
  );
}