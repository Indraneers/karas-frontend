import { DropdownActionItem, DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";
import { ProductResponseDto } from "../types/product.dto";


interface ProductActionsProps {
  id: string;
  handleDelete: (id: string) => Promise<ProductResponseDto>;
}

export function ProductActions({ id, handleDelete }: ProductActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
  });

  const dropdownActionItems: DropdownActionItem[] = [
    {
      key: 1,
      onClick: (e) => {
        e.stopPropagation();
        navigate({ to: `/inventory/products/edit/` + id });
      },
      content: <><Edit /> Edit Product</>
    },
    {
      key: 2,
      onClick: (e) => {
        e.stopPropagation();
        mutatation.mutate(id);
      },
      content: <><Trash /> Delete Product</>
    }
  ];

  return <DropdownAction label='Product Actions' items={dropdownActionItems} />;
}