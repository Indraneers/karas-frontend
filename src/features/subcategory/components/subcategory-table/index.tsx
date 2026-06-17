import { cn } from "@/lib/utils";
import { DataTableAutoPagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { Subcategory } from "../../types/subcategory";
import { deleteSubcategory } from "../../api/subcategory";
import { ContextOption } from "@/types/context-options";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Edit } from "lucide-react";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";
import { SubcategoryFormSheet } from "../subcategory-form-sheet";

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
  const [editSubcategory, setEditSubcategory] = useState<Subcategory | null>(null);
  const mutation = useMutation({
    mutationFn: async (id: string) => deleteSubcategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["subcategories"] }),
  });

  const contextOptions: ContextOption<Subcategory>[] = [
    {
      key: 1,
      onClick: (subcategory) => {
        setEditSubcategory(subcategory);
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
      <SubcategoryFormSheet
        open={!!editSubcategory}
        onOpenChange={(open) => !open && setEditSubcategory(null)}
        subcategoryId={editSubcategory?.id}
      />
    </div>
  );
}
