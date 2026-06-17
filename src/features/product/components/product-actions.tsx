import { DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { ProductResponseDto } from "../types/product.dto";
import { Product } from "../types/product";
import { DropdownActionItem } from "@/types/context-options";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";
import { ProductFormSheet } from "./product-form-sheet";

interface ProductActionsProps {
  value: Product;
  handleDelete: (id: string) => Promise<ProductResponseDto>;
}

export function ProductActions({ value, handleDelete }: ProductActionsProps) {
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const dropdownActionItems: DropdownActionItem<Product>[] = [
    {
      key: 1,
      onClick: () => {
        setEditOpen(true);
      },
      content: (
        <>
          <Edit /> Edit Product
        </>
      ),
    },
    {
      key: 2,
      content: (product) => (
        <DeleteWithConfirmation
          object="product"
          onConfirm={() => mutation.mutate(product.id || "")}
          isLoading={mutation.isPending}
        />
      ),
    },
  ];

  return (
    <>
      <DropdownAction
        label="Product Actions"
        items={dropdownActionItems}
        value={value}
      />
      <ProductFormSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        productId={value.id}
        existingImg={value.img}
      />
    </>
  );
}
