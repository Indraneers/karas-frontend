import { DropdownActionItem, DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";
import { CustomerDto } from "../types/customer.dto";


interface CustomerActionsProps {
  id: string;
  handleDelete: (id: string) => Promise<CustomerDto>;
}

export function CustomerActions({ id, handleDelete }: CustomerActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers'] })
  });

  const dropdownActionItems: DropdownActionItem[] = [
    {
      key: 1,
      onClick: (e) => {
        e.stopPropagation();
        navigate({ to: `/customers/edit/` + id });
      },
      content: <><Edit /> Edit Customer</>
    },
    {
      key: 2,
      onClick: (e) => {
        e.stopPropagation();
        mutatation.mutate(id);
      },
      content: <><Trash /> Delete Customer</>
    }
  ];

  return <DropdownAction label='Customer Actions' items={dropdownActionItems} />;
}