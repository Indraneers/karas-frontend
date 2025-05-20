import { DropdownActionItem, DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";
import { CategoryDto } from "../types/category.dto";


interface CategoryActionsProps {
  id: string;
  handleDelete: (id: string) => Promise<CategoryDto>;
}

export function CategoryActions({ id, handleDelete }: CategoryActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] })
  });

  const dropdownActionItems: DropdownActionItem[] = [
    {
      key: 1,
      onClick: (e) => {
        e.stopPropagation();
        navigate({ to: `/inventory/categories/edit/` + id });
      },
      content: <><Edit /> Edit Category</>
    },
    {
      key: 2,
      onClick: (e) => {
        e.stopPropagation();
        mutatation.mutate(id);
      },
      content: <><Trash /> Delete Category</>
    }
  ];

  return <DropdownAction label='Category Actions' items={dropdownActionItems} />;
}