import { DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { UnitResponseDto } from "../types/unit.dto";
import { Unit } from "../types/unit";
import { DropdownActionItem } from "@/types/context-options";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";
import { UnitFormSheet } from "./unit-form-sheet";

interface UnitActionsProps {
  value: Unit;
  handleDelete: (id: string) => Promise<UnitResponseDto>;
}

export function UnitActions({ value, handleDelete }: UnitActionsProps) {
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["units"] }),
  });

  const dropdownActionItems: DropdownActionItem<Unit>[] = [
    {
      key: 1,
      onClick: () => {
        setEditOpen(true);
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
    <>
      <DropdownAction
        label="Unit Actions"
        items={dropdownActionItems}
        value={value}
      />
      <UnitFormSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        unitId={value.id}
        existingImg={value.img}
      />
    </>
  );
}
