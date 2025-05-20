import { DropdownActionItem, DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";
import { SubcategoryResponseDto } from "../types/subcategory.dto";

interface SubcategoryActionsProps {
  id: string;
  handleDelete: (id: string) => Promise<SubcategoryResponseDto>;
}

export function SubcategoryActions({ id, handleDelete }: SubcategoryActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subcategories'] })
  });

  const dropdownActionItems: DropdownActionItem[] = [
    {
      key: 1,
      onClick: (e) => {
        e.stopPropagation();
        navigate({ to: `/inventory/subcategories/edit/` + id });
      },
      content: <><Edit /> Edit Subcategory</>
    },
    {
      key: 2,
      onClick: (e) => {
        e.stopPropagation();
        mutatation.mutate(id);
      },
      content: <><Trash /> Delete Subcategory</>
    }
  ];

  return <DropdownAction label='Subcategory Actions' items={dropdownActionItems} />;
}