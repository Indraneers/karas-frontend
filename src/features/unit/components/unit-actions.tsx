import { DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import { UnitResponseDto } from "../types/unit.dto";
import { Unit } from "../types/unit";
import { DropdownActionItem } from "@/types/context-options";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";

interface UnitActionsProps {
  value: Unit;
  handleDelete: (id: string) => Promise<UnitResponseDto>;
}

export function UnitActions({ value, handleDelete }: UnitActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["units"] }),
  });

  const dropdownActionItems: DropdownActionItem<Unit>[] = [
    {
      key: 1,
      onClick: (unit) => {
        navigate({ to: `/inventory/units/edit/` + unit.id });
      },
      content: (
        <>
          <Edit /> Edit Unit
        </>
      ),
    },
    {
      key: 2,
      content: (unit) => (
        <DeleteWithConfirmation
          object="unit"
          onConfirm={() => mutation.mutate(unit.id || "")}
          isLoading={mutation.isPending}
        />
      ),
    },
  ];

  return (
    <DropdownAction
      label="Unit Actions"
      items={dropdownActionItems}
      value={value}
    />
  );
}
