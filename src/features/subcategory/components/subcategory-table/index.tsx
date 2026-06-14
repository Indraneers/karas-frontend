import { cn } from "@/lib/utils";
import { DataTableAutoPagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { Subcategory } from "../../types/subcategory";
import { deleteSubcategory } from "../../api/subcategory";
import { ContextOption } from "@/types/context-options";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";

interface SubcategoryTableProps {
  className?: string;
  subcategories: Subcategory[];
  isLoading?: boolean;
}

export function SubcategoryTable({
  isLoading,
  className,
  subcategories,
}: SubcategoryTableProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (id: string) => deleteSubcategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["subcategories"] }),
  });

  const contextOptions: ContextOption<Subcategory>[] = [
    {
      key: 1,
      onClick: (subcategory) => {
        navigate({ to: `/inventory/subcategories/edit/` + subcategory.id });
      },
      content: (
        <>
          <Edit /> Edit Subcategory
        </>
      ),
    },
    {
      key: 2,
      content: (subcategory) => (
        <DeleteWithConfirmation
          object="subcategory"
          onConfirm={() => mutation.mutate(subcategory.id || "")}
          isLoading={mutation.isPending}
        />
      ),
    },
  ];
  return (
    <div className={cn([className])}>
      <DataTableAutoPagination
        isLoading={isLoading}
        columns={columns}
        data={subcategories}
        contextLabel="Subcategory Actions"
        contextOptions={contextOptions}
      />
    </div>
  );
}
