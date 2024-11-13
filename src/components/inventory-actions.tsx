import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface InventoryActionsProps<T> {
  id: string,
  type: 'categories' | 'products' | 'units',
  handleDelete: (d: string) => Promise<T>
}

export function InventoryActions<T>({ id, type, handleDelete }: InventoryActionsProps<T>) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [type] })
  });

  let title;

  switch (type) {
  case 'categories':
    title = 'Category';
    break;
  case 'products':
    title = 'Product';
    break;
  case 'units':
    title = 'Unit';
    break;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 w-8 h-8">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="capitalize">{title} Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigate({ to: `/inventory/${ type }/edit/` + id })}
        >
          <Edit />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => mutatation.mutate(id)}
        >
          <Trash />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}