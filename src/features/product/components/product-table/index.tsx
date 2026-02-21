import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Product } from "@/features/product/types/product";
import { PaginationDetail } from "@/types/pagination";
import { useState } from "react";
import { ContextOption } from "@/types/context-options";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import { deleteProduct } from "../../api/product";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";

interface ProductTablePage {
  className?: string;
  products: Product[];
  isLoading?: boolean;
  paginationDetail: PaginationDetail;
}

export function ProductTable({
  isLoading,
  className,
  products,
  paginationDetail,
}: ProductTablePage) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (id: string) => deleteProduct(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const contextOptions: ContextOption<Product>[] = [
    {
      key: 1,
      onClick: (product) => {
        navigate({ to: `/inventory/products/edit/` + product.id });
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
    <div className={cn(className)}>
      <DataTablePagination
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        isLoading={isLoading}
        columns={columns}
        data={products}
        paginationDetail={paginationDetail}
        contextLabel="Product Actions"
        contextOptions={contextOptions}
      />
    </div>
  );
}
