import { DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";
import { SubcategoryResponseDto } from "../types/subcategory.dto";
import { Subcategory } from "../types/subcategory";
import { DropdownActionItem } from "@/types/context-options";

interface SubcategoryActionsProps {
  value: Subcategory
  handleDelete: (id: string) => Promise<SubcategoryResponseDto>;
}

export function SubcategoryActions({ value, handleDelete }: SubcategoryActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subcategories'] })
  });

  const dropdownActionItems: DropdownActionItem<Subcategory>[] = [
    {
      key: 1,
      onClick: (subcategory) => {
        navigate({ to: `/inventory/subcategories/edit/` + subcategory.id });
      },
      content: <><Edit /> Edit Subcategory</>
    },
    {
      key: 2,
      onClick: (subcategory) => {
        mutatation.mutate(subcategory.id);
      },
      content: <><Trash /> Delete Subcategory</>
    }
  ];

  return <DropdownAction label='Subcategory Actions' items={dropdownActionItems} value={value} />;
}