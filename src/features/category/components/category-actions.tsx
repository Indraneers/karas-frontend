import { DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import { CategoryDto } from "../types/category.dto";
import { Category } from "../types/category";
import { DropdownActionItem } from "@/types/context-options";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";

interface CategoryActionsProps {
  value: Category;
  handleDelete: (id: string) => Promise<CategoryDto>;
}

export function CategoryActions({ value, handleDelete }: CategoryActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const dropdownActionItems: DropdownActionItem<Category>[] = [
    {
      key: 1,
      onClick: (category) => {
        navigate({ to: `/inventory/categories/edit/` + category.id });
      },
      content: (
        <>
          <Edit /> Edit Category
        </>
      ),
    },
    {
      key: 2,
      content: (category) => (
        <DeleteWithConfirmation
          object="category"
          onConfirm={() => mutation.mutate(category.id || "")}
          isLoading={mutation.isPending}
        />
      ),
    },
  ];

  return (
    <DropdownAction
      label="Category Actions"
      items={dropdownActionItems}
      value={value}
    />
  );
}
