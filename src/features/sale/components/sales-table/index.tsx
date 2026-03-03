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
import { BadgeDollarSign, Printer, Edit } from "lucide-react";
import { useSearchPagination } from "@/hooks/use-search-pagination";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";

export function SalesTable({
  className,
  queryKey = ["sales"],
}: {
  className?: string;
  queryKey: string[];
}) {
  const { isLoading, data, paginationDetail } = useSearchPagination({
    key: queryKey,
    getEntity: getSales,
  });
  const navigate = useNavigate();

  const sales = data
    ? data.content.map((s) => convertSaleResponseDtoToSale(s))
    : [];

  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const queryClient = useQueryClient();
  const payMutation = useMutation({
    mutationFn: async (id: string) => paySale(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sales"] }),
  });
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteSale(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sales"] }),
  });

  const contextOptions: ContextOption<Sale>[] = [
    {
      key: 1,
      onClick: (sale) => {
        payMutation.mutate(sale.id || "");
      },
      content: (
        <>
          <BadgeDollarSign /> Set Paid
        </>
      ),
    },
    {
      key: 2,
      onClick: (sale) => {
        onClickUrl("/invoice/" + sale.id + "?print=true")();
      },
      content: (
        <>
          <Printer /> Print
        </>
      ),
    },
    {
      key: 3,
      onClick: (sale) => {
        navigate({ to: "/sales/edit/" + sale.id });
      },
      content: (
        <>
          <Edit /> Edit
        </>
      ),
    },
    {
      key: 4,
      content: (sale) => (
        <DeleteWithConfirmation
          object="sale"
          onConfirm={() => deleteMutation.mutate(sale.id || "")}
          isLoading={deleteMutation.isPending}
        />
      ),
    },
  ];

  return (
    <div className={cn(className)}>
      {isLoading && <PageLoading />}
      {!isLoading && (
        <DataTablePagination
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          onRowClick={(data: Sale) => navigate({ to: "/sales/" + data.id })}
          columns={columns}
          data={sales}
          paginationDetail={paginationDetail}
          contextOptions={contextOptions}
          contextLabel="Sales Actions"
        />
      )}
    </div>
  );
}
