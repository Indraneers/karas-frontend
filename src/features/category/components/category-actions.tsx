import { DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";
import { CategoryDto } from "../types/category.dto";
import { Category } from "../types/category";
import { DropdownActionItem } from "@/types/context-options";


interface CategoryActionsProps {
  value: Category;
  handleDelete: (id: string) => Promise<CategoryDto>;
}

export function CategoryActions({ value, handleDelete }: CategoryActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] })
  });

  const dropdownActionItems: DropdownActionItem<Category>[] = [
    {
      key: 1,
      onClick: (category) => {
        navigate({ to: `/inventory/categories/edit/` + category.id });
      },
      content: <><Edit /> Edit Category</>
    },
    {
      key: 2,
      onClick: (category) => {
        mutatation.mutate(category.id);
      },
      content: <><Trash /> Delete Category</>
    }
  ];

  return <DropdownAction label='Category Actions' items={dropdownActionItems} value={value} />;
}