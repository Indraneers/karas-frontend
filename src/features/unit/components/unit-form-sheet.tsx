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
import { createUnit, getUnitById, updateUnit } from "../api/unit";
import { UnitForm } from "./unit-form";
import { UnitRequestDto, UnitResponseDto } from "../types/unit.dto";
import { convertUnitDtoToUnitForm } from "../util/convert";

interface UnitFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When set, the sheet edits this unit; otherwise it creates a new unit. */
  unitId?: string;
  /** Optional existing icon URL for an instant preview before the fetch lands. */
  existingImg?: string;
  /** Called after a successful create/update with the saved unit. */
  onSaved?: (unit: UnitResponseDto) => void;
}

/**
 * Reusable create/edit panel for a Unit. Shared by the Unit & Stock table
 * ("New Unit" + row edit) and the POS right-click → edit flow, so both surfaces
 * get the same form — including POS icon upload — without a page reroute.
 */
export function UnitFormSheet({
  open,
  onOpenChange,
  unitId,
  existingImg,
  onSaved
}: UnitFormSheetProps) {
  const queryClient = useQueryClient();
  const isEdit = !!unitId;

  const unitQuery = useQuery({
    queryKey: ["unit-" + unitId],
    queryFn: () => getUnitById(unitId as string),
    enabled: open && isEdit
  });

  const mutation = useMutation({
    mutationFn: ({ unitDto, file }: { unitDto: UnitRequestDto; file?: File }) =>
      isEdit ? updateUnit(unitId as string, unitDto, file) : createUnit(unitDto, file),
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: ["units"] });
      if (isEdit) {
        queryClient.invalidateQueries({ queryKey: ["unit-" + unitId] });
      }
      toast.success(isEdit ? "Unit updated" : "Unit created");
      onSaved?.(saved);
      onOpenChange(false);
    },
    onError: () => {
      toast.error(isEdit ? "Failed to update unit" : "Failed to create unit");
    }
  });

  const loadingData = isEdit && (unitQuery.isLoading || !unitQuery.data);
  const previewImg = unitQuery.data?.img || existingImg;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[480px] sm:max-w-[480px] gap-0 p-0">
        <SheetHeader className="px-5 py-4 border-b border-border/60">
          <SheetTitle className="font-display text-xl font-medium">
            {isEdit ? "Edit Unit" : "New Unit"}
          </SheetTitle>
          <SheetDescription className="text-xs">
            {isEdit
              ? "Update the unit details, pricing, and POS icon."
              : "Create a unit and set its pricing and POS icon."}
          </SheetDescription>
        </SheetHeader>

        <div className="px-5 py-5 overflow-y-auto flex-1">
          {loadingData ? (
            <div className="space-y-4">
              <Skeleton className="w-full h-9" />
              <Skeleton className="w-full h-9" />
              <Skeleton className="w-[180px] h-[180px]" />
              <Skeleton className="w-full h-9" />
            </div>
          ) : (
            <UnitForm
              isSheet
              existingImg={previewImg}
              isSubmitting={mutation.isPending}
              data={isEdit && unitQuery.data ? convertUnitDtoToUnitForm(unitQuery.data) : undefined}
              handleSubmit={mutation.mutate}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
