import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { convertCustomerDtoToCustomer } from "../../utils/customer";
import { CustomerDto } from "../../types/customer.dto";
import { PaginationDetail } from "@/types/pagination";

export function CustomerTable({ className, data, paginationDetail } : { className?: string, data: CustomerDto[], paginationDetail: PaginationDetail }) {
  return (
    <div className={className}>
      <DataTablePagination data={data.map(c => convertCustomerDtoToCustomer(c))} columns={columns} paginationDetail={paginationDetail} />
    </div>
  );
}