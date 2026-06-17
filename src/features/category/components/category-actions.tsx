import { DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { CategoryDto } from "../types/category.dto";
import { Category } from "../types/category";
import { DropdownActionItem } from "@/types/context-options";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";
import { CategoryFormSheet } from "./category-form-sheet";

interface CategoryActionsProps {
  value: Category;
  handleDelete: (id: string) => Promise<CategoryDto>;
}

export function CategoryActions({ value, handleDelete }: CategoryActionsProps) {
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const dropdownActionItems: DropdownActionItem<Category>[] = [
    {
      key: 1,
      onClick: () => {
        setEditOpen(true);
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
    <>
      <DropdownAction
        label="Category Actions"
        items={dropdownActionItems}
        value={value}
      />
      <CategoryFormSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        categoryId={value.id}
        existingImg={value.img}
      />
    </>
  );
}
