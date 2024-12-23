import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../../api/customer";
import { convertCustomerDtoToCustomer } from "../../utils/customer";

export function CustomerTable({ className } : { className?: string }) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getAllCustomers()
  });

  if (isError) {
    return 'error';
  }

  if (isLoading) {
    return 'loading';
  }

  if (!data) {
    return 'empty';
  }

  return (
    <div className={className}>
      <DataTablePagination data={data.map(c => convertCustomerDtoToCustomer(c))} columns={columns} />
    </div>
  );
}