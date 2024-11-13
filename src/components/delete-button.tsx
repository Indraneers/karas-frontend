import TrashIcon from "@/assets/trash.svg?react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteButtonProps<T> {
  id: string;
  type: 'categories' | 'products' | 'units';
  handleDelete: (d: string) => Promise<T>
}

export function DeleteButton<T>({ type, id, handleDelete }: DeleteButtonProps<T>) {
  const queryClient = useQueryClient();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [type] })
  });
  return (
    <Button 
      onClick={() => mutatation.mutate(id)} 
      className="hover:bg-transparent" 
      variant="ghost" 
      size="icon"
    >
      <TrashIcon />
    </Button>
  );
}