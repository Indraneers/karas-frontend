import { DeleteButton } from "@/components/delete-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../api/category";

interface DeleteCategoryButtonProps {
  categoryId: string;
}

export function DeleteCategoryButton({ categoryId }: DeleteCategoryButtonProps) {
  const queryClient = useQueryClient();
  const mutatation = useMutation({
    mutationFn: async (categoryId: string) => deleteCategory(categoryId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] })
  });
  return (
    <DeleteButton onClick={() => mutatation.mutate(categoryId)} />
  );
}