import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { convertCustomerDtoToCustomer } from "../../utils/customer";
import { CustomerDto } from "../../types/customer.dto";

export function CustomerTable({ className, data } : { className?: string, data: CustomerDto[] }) {
  return (
    <div className={className}>
      <DataTablePagination data={data.map(c => convertCustomerDtoToCustomer(c))} columns={columns} />
    </div>
  );
}