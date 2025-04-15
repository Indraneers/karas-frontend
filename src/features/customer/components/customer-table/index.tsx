import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { convertCustomerDtoToCustomer } from "../../utils/customer";
import { CustomerDto } from "../../types/customer.dto";
import { PaginationDetail } from "@/types/pagination";
import { useState } from "react";

export function CustomerTable({ className, data, paginationDetail } : { className?: string, data: CustomerDto[], paginationDetail: PaginationDetail }) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  return (
    <div className={className}>
      <DataTablePagination 
        data={data.map(c => convertCustomerDtoToCustomer(c))} 
        columns={columns} 
        paginationDetail={paginationDetail} 
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />
    </div>
  );
}