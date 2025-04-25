import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { convertCustomerDtoToCustomer } from "../../utils/customer";
import { CustomerDto } from "../../types/customer.dto";
import { PaginationDetail } from "@/types/pagination";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Customer } from "../../types/customer";

export function CustomerTable({ className, data, paginationDetail } : { className?: string, data: CustomerDto[], paginationDetail: PaginationDetail }) {
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  return (
    <div className={className}>
      <DataTablePagination 
        data={data.map(c => convertCustomerDtoToCustomer(c))} 
        onRowClick={(data: Customer) => navigate({ to: '/customers/' + data.id })}
        columns={columns} 
        paginationDetail={paginationDetail} 
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />
    </div>
  );
}