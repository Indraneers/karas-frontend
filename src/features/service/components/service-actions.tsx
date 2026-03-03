import { ServiceDto } from "../types/service.dto";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DropdownAction } from "@/components/dropdown-action";
import { Edit } from "lucide-react";
import { Service } from "../types/service";
import { DropdownActionItem } from "@/types/context-options";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";

interface ServiceActionsProps {
  value: Service;
  handleDelete: (id: string) => Promise<ServiceDto>;
}

export function ServiceActions({ value, handleDelete }: ServiceActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });

  const dropdownActionItems: DropdownActionItem<Service>[] = [
    {
      key: 1,
      onClick: (service) => {
        navigate({ to: `/services/edit/` + service.id });
      },
      content: (
        <>
          <Edit /> Edit Service
        </>
      ),
    },
    {
      key: 2,
      content: (service) => (
        <DeleteWithConfirmation
          object="service"
          onConfirm={() => mutation.mutate(service.id || "")}
          isLoading={mutation.isPending}
        />
      ),
    },
  ];

  return (
    <DropdownAction
      label="Service Actions"
      items={dropdownActionItems}
      value={value}
    />
  );
}
