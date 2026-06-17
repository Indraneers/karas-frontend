import { DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { SubcategoryResponseDto } from "../types/subcategory.dto";
import { Subcategory } from "../types/subcategory";
import { DropdownActionItem } from "@/types/context-options";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";
import { SubcategoryFormSheet } from "./subcategory-form-sheet";

interface SubcategoryActionsProps {
  value: Subcategory;
  handleDelete: (id: string) => Promise<SubcategoryResponseDto>;
}

export function SubcategoryActions({
  value,
  handleDelete,
}: SubcategoryActionsProps) {
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["subcategories"] }),
  });

  const dropdownActionItems: DropdownActionItem<Subcategory>[] = [
    {
      key: 1,
      onClick: () => {
        setEditOpen(true);
      },
      content: (
        <>
          <Edit /> Edit Subcategory
        </>
      ),
    },
    {
      key: 2,
      content: (subcategory) => (
        <DeleteWithConfirmation
          object="subcategory"
          onConfirm={() => mutation.mutate(subcategory.id || "")}
          isLoading={mutation.isPending}
        />
      ),
    },
  ];

  return (
    <>
      <DropdownAction
        label="Subcategory Actions"
        items={dropdownActionItems}
        value={value}
      />
      <SubcategoryFormSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        subcategoryId={value.id}
      />
    </>
  );
}
