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
import { createSubcategory, getSubcategoryById, updateSubcategory } from "../api/subcategory";
import { SubcategoryForm } from "./subcategory-form";
import { SubcategoryRequestDto, SubcategoryResponseDto } from "../types/subcategory.dto";
import { convertSCResponseDtoToSCRequestDto } from "../utils/convert";

interface SubcategoryFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When set, the sheet edits this subcategory; otherwise it creates a new one. */
  subcategoryId?: string;
  /** Optional existing icon URL for an instant preview before the fetch lands. */
  existingImg?: string;
  onSaved?: (subcategory: SubcategoryResponseDto) => void;
}

/**
 * Reusable create/edit panel for a Subcategory. Shared by the Subcategories
 * table ("New Subcategory" + row edit) and the POS right-click → edit flow.
 */
export function SubcategoryFormSheet({
  open,
  onOpenChange,
  subcategoryId,
  existingImg,
  onSaved
}: SubcategoryFormSheetProps) {
  const queryClient = useQueryClient();
  const isEdit = !!subcategoryId;

  const subcategoryQuery = useQuery({
    queryKey: ["subcategory-" + subcategoryId],
    queryFn: () => getSubcategoryById(subcategoryId as string),
    enabled: open && isEdit
  });

  const mutation = useMutation({
    mutationFn: ({ scDto, file }: { scDto: SubcategoryRequestDto; file?: File }) =>
      isEdit
        ? updateSubcategory(subcategoryId as string, scDto, file)
        : createSubcategory(scDto, file),
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      if (isEdit) {
        queryClient.invalidateQueries({ queryKey: ["subcategory-" + subcategoryId] });
      }
      toast.success(isEdit ? "Subcategory updated" : "Subcategory created");
      onSaved?.(saved);
      onOpenChange(false);
    },
    onError: () => {
      toast.error(isEdit ? "Failed to update subcategory" : "Failed to create subcategory");
    }
  });

  const loadingData = isEdit && (subcategoryQuery.isLoading || !subcategoryQuery.data);
  const previewImg = subcategoryQuery.data?.img || existingImg;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[480px] sm:max-w-[480px] gap-0 p-0">
        <SheetHeader className="px-5 py-4 border-b border-border/60">
          <SheetTitle className="font-display text-xl font-medium">
            {isEdit ? "Edit Subcategory" : "New Subcategory"}
          </SheetTitle>
          <SheetDescription className="text-xs">
            {isEdit
              ? "Update the subcategory name, POS icon, color, and category."
              : "Create a subcategory and set its POS icon, color, and category."}
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
            <SubcategoryForm
              isSheet
              existingImg={previewImg}
              isSubmitting={mutation.isPending}
              data={
                isEdit && subcategoryQuery.data
                  ? convertSCResponseDtoToSCRequestDto(subcategoryQuery.data)
                  : undefined
              }
              handleSubmit={mutation.mutateAsync}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
