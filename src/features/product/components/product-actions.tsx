import { DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";
import { ProductResponseDto } from "../types/product.dto";
import { Product } from "../types/product";
import { DropdownActionItem } from "@/types/context-options";


interface ProductActionsProps {
  value: Product;
  handleDelete: (id: string) => Promise<ProductResponseDto>;
}

export function ProductActions({ value, handleDelete }: ProductActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
  });

  const dropdownActionItems: DropdownActionItem<Product>[] = [
    {
      key: 1,
      onClick: (product) => {
        navigate({ to: `/inventory/products/edit/` + product.id });
      },
      content: <><Edit /> Edit Product</>
    },
    {
      key: 2,
      onClick: (product) => {
        mutatation.mutate(product.id);
      },
      content: <><Trash /> Delete Product</>
    }
  ];

  return <DropdownAction label='Product Actions' items={dropdownActionItems} value={value} />;
}