import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCategory, getCategoryById, updateCategory } from "../api/category";
import { CategoryForm } from "./category-form";
import { CategoryDto } from "../types/category.dto";
import { Category } from "../types/category";

interface CategoryFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When set, the sheet edits this category; otherwise it creates a new one. */
  categoryId?: string;
  /** Optional existing icon URL for an instant preview before the fetch lands. */
  existingImg?: string;
  onSaved?: (category: Category) => void;
}

/**
 * Reusable create/edit panel for a Category. Shared by the Categories table
 * ("New Category" + row edit) and the POS right-click → edit flow, so both get
 * the same form — including POS icon upload — without a page reroute.
 */
export function CategoryFormSheet({
  open,
  onOpenChange,
  categoryId,
  existingImg,
  onSaved
}: CategoryFormSheetProps) {
  const queryClient = useQueryClient();
  const isEdit = !!categoryId;

  const categoryQuery = useQuery({
    queryKey: ["category-" + categoryId],
    queryFn: () => getCategoryById(categoryId as string),
    enabled: open && isEdit
  });

  const mutation = useMutation({
    mutationFn: ({ categoryDto, file }: { categoryDto: CategoryDto; file?: File }) =>
      isEdit
        ? updateCategory(categoryId as string, categoryDto, file)
        : createCategory(categoryDto, file),
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      if (isEdit) {
        queryClient.invalidateQueries({ queryKey: ["category-" + categoryId] });
      }
      toast.success(isEdit ? "Category updated" : "Category created");
      onSaved?.(saved);
      onOpenChange(false);
    },
    onError: () => {
      toast.error(isEdit ? "Failed to update category" : "Failed to create category");
    }
  });

  const loadingData = isEdit && (categoryQuery.isLoading || !categoryQuery.data);
  const previewImg = categoryQuery.data?.img || existingImg;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[480px] sm:max-w-[480px] gap-0 p-0">
        <SheetHeader className="px-5 py-4 border-b border-border/60">
          <SheetTitle className="font-display text-xl font-medium">
            {isEdit ? "Edit Category" : "New Category"}
          </SheetTitle>
          <SheetDescription className="text-xs">
            {isEdit
              ? "Update the category name, POS icon, and color."
              : "Create a category and set its POS icon and color."}
          </SheetDescription>
        </SheetHeader>

        <div className="px-5 py-5 overflow-y-auto flex-1">
          {loadingData ? (
            <div className="space-y-4">
              <Skeleton className="w-full h-9" />
              <Skeleton className="w-[180px] h-[180px]" />
              <Skeleton className="w-full h-9" />
            </div>
          ) : (
            <CategoryForm
              isSheet
              existingImg={previewImg}
              isSubmitting={mutation.isPending}
              data={isEdit && categoryQuery.data ? categoryQuery.data : undefined}
              handleSubmit={mutation.mutate}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
