import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { deleteSale, getSales, paySale } from "../../api/sale";
import { convertSaleResponseDtoToSale } from "../../utils/sale";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Sale } from "../../types/sale";
import { PageLoading } from "@/components/page-loading";
import { useSearchPagination } from "@/hooks/use-search-pagination";
import { useState } from "react";
import { Page } from "@/types/page";
import { SaleResponseDto } from "../../types/sale.dto";
import { SaleSearch } from "../../types/sale-search";
import { convertDateToLocaleDate } from "@/lib/date";
import { APIQuery } from "@/types/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContextOption } from "@/types/context-options";
import { onClickUrl } from "@/lib/link";
import { BadgeDollarSign, Printer, Edit, Trash2 } from "lucide-react";

export function SalesTable({ className, key = 'sales', getSalesFn = getSales, saleSearch } : { 
  className?: string, 
  key?: string,
  getSalesFn?: (saleQuery: APIQuery) => Promise<Page<SaleResponseDto>>,
  saleSearch: SaleSearch,
}) {
  const navigate = useNavigate();
  const { isLoading, data, ...paginationDetail } = 
    useSearchPagination({ 
      key, 
      getEntity: getSalesFn,
      query: {
        createdAtFrom: 
          saleSearch.createdAtFrom ? 
            convertDateToLocaleDate(saleSearch.createdAtFrom)
            : 
            undefined,
        createdAtTo: 
            saleSearch.createdAtTo ? 
              convertDateToLocaleDate(saleSearch.createdAtTo) 
              : 
              undefined,
        customerId: saleSearch.customerId
      }
    });

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