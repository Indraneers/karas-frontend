import { ServiceDto } from "../types/service.dto";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DropdownAction, DropdownActionItem } from "@/components/dropdown-action";
import { Edit, Trash } from "lucide-react";

interface ServiceActionsProps {
  id: string;
  handleDelete: (id: string) => Promise<ServiceDto>;
}

export function ServiceActions({ id, handleDelete }: ServiceActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['services'] })
  });

  const dropdownActionItems: DropdownActionItem[] = [
    {
      key: 1,
      onClick: (e) => {
        e.stopPropagation();
        navigate({ to: `/services/edit/` + id });
      },
      content: <><Edit /> Edit Service</>
    },
    {
      key: 2,
      onClick: (e) => {
        e.stopPropagation();
        mutatation.mutate(id);
      },
      content: <><Trash /> Delete Service</>
    }
  ];

  return <DropdownAction label='Service Actions' items={dropdownActionItems} />;
}