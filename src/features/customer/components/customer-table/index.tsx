import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { convertCustomerDtoToCustomer } from "../../utils/customer";
import { CustomerDto } from "../../types/customer.dto";
import { PaginationDetail } from "@/types/pagination";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Customer } from "../../types/customer";
import { ContextOption } from "@/types/context-options";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import { deleteCustomer } from "../../api/customer";

export function CustomerTable({ className, data, paginationDetail } : { className?: string, data: CustomerDto[], paginationDetail: PaginationDetail }) {
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const queryClient = useQueryClient();
  const mutatation = useMutation({
    mutationFn: async (id: string) => deleteCustomer(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers'] })
  });

  const contextOptions: ContextOption<Customer>[] = [
    {
      key: 1,
      onClick: (customer) => {
        navigate({ to: `/customers/edit/` + customer.id });
      },
      content: <><Edit /> Edit Customer</>
    },
    {
      key: 2,
      onClick: (customer) => {
        mutatation.mutate(customer.id);
      },  
      content: <><Trash /> Delete Customer</>
    }
  ];
  
  return (
    <div className={className}>
      <DataTablePagination 
        data={data.map(c => convertCustomerDtoToCustomer(c))} 
        onRowClick={(data: Customer) => navigate({ to: '/customers/' + data.id })}
        columns={columns} 
        paginationDetail={paginationDetail} 
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        contextLabel="Customer Actions"
        contextOptions={contextOptions}
      />
    </div>
  );
}