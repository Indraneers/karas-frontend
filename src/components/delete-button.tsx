import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteButtonProps<T> {
  id: string;
  type: 'categories' | 'products' | 'units' | 'sales';
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
      className="w-6 h-6"
      onClick={(e) => {
        e.stopPropagation();
        mutatation.mutate(id);
      }} 
      variant="ghost" 
      size="icon"
    >
      <Trash />
    </Button>
  );
}