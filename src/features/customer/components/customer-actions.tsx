import { DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";
import { CustomerDto } from "../types/customer.dto";
import { Customer } from "../types/customer";
import { DropdownActionItem } from "@/types/context-options";


interface CustomerActionsProps {
  value: Customer;
  handleDelete: (id: string) => Promise<CustomerDto>;
}

export function CustomerActions({ value, handleDelete }: CustomerActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers'] })
  });

  const dropdownActionItems: DropdownActionItem<Customer>[] = [
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

  return <DropdownAction label='Customer Actions' items={dropdownActionItems} value={value} />;
}