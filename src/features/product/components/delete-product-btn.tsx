import { DeleteButton } from "@/components/delete-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/product";

interface DeleteCategoryButtonProps {
  productId: string;
}

export function DeleteProductButton({ productId }: DeleteCategoryButtonProps) {
  const queryClient = useQueryClient();
  const mutatation = useMutation({
    mutationFn: async (productId: string) => deleteProduct(productId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] })
  });
  return (
    <DeleteButton onClick={() => mutatation.mutate(productId)} />
  );
}