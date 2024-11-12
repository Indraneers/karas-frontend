import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { deleteProduct } from "../api/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ProductActionsProps {
  productId: string;
}

export function ProductActions({ productId }: ProductActionsProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutatation = useMutation({
    mutationFn: async (categoryId: string) => deleteProduct(categoryId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 w-8 h-8">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Product Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigate({ to: '/inventory/products/edit/' + productId })}
        >
          <Edit />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => mutatation.mutate(productId)}
        >
          <Trash />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}