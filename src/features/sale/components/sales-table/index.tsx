import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "../../api/sale";
import { convertSaleDtoToSale } from "../../utils/sale";

export function SalesTable() {
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

  const sales = data?.map(s => convertSaleDtoToSale(s));

  return (
    <DataTablePagination columns={columns} data={sales || []} />
  );
}