import { DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import { SubcategoryResponseDto } from "../types/subcategory.dto";
import { Subcategory } from "../types/subcategory";
import { DropdownActionItem } from "@/types/context-options";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";

interface SubcategoryActionsProps {
  value: Subcategory;
  handleDelete: (id: string) => Promise<SubcategoryResponseDto>;
}

export function SubcategoryActions({
  value,
  handleDelete,
}: SubcategoryActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["subcategories"] }),
  });

  const dropdownActionItems: DropdownActionItem<Subcategory>[] = [
    {
      key: 1,
      onClick: (subcategory) => {
        navigate({ to: `/inventory/subcategories/edit/` + subcategory.id });
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
    <DropdownAction
      label="Subcategory Actions"
      items={dropdownActionItems}
      value={value}
    />
  );
}
