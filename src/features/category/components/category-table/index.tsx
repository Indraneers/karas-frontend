import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { Category } from "@/features/category/types/category";
import { DataTableAutoPagination } from "@/components/data-table-pagination";
import { ContextOption } from "@/types/context-options";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";
import { deleteCategory } from "../../api/category";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";

interface CategoryTablePage {
  className?: string;
  categories: Category[];
  isLoading?: boolean;
}

export function CategoryTable({
  isLoading,
  className,
  categories,
}: CategoryTablePage) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (id: string) => deleteCategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const contextOptions: ContextOption<Category>[] = [
    {
      key: 1,
      onClick: (category) => {
        navigate({ to: `/inventory/categories/edit/` + category.id });
      },
      content: (
        <>
          <Edit /> Edit Category
        </>
      ),
    },
    {
      key: 2,
      content: (category) => (
        <DeleteWithConfirmation
          object="category"
          onConfirm={() => mutation.mutate(category.id || "")}
          isLoading={mutation.isPending}
        />
      ),
    },
  ];
  return (
    <div className={cn(className)}>
      <DataTableAutoPagination
        isLoading={isLoading}
        columns={columns}
        data={categories}
        contextLabel="Category Action"
        contextOptions={contextOptions}
      />
    </div>
  );
}
