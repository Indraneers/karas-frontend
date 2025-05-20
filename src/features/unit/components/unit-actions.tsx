import { DropdownActionItem, DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";
import { UnitResponseDto } from "../types/unit.dto";


interface UnitActionsProps {
  id: string;
  handleDelete: (id: string) => Promise<UnitResponseDto>;
}

export function UnitActions({ id, handleDelete }: UnitActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['units'] })
  });

  const dropdownActionItems: DropdownActionItem[] = [
    {
      key: 1,
      onClick: (e) => {
        e.stopPropagation();
        navigate({ to: `/inventory/units/edit/` + id });
      },
      content: <><Edit /> Edit Unit</>
    },
    {
      key: 2,
      onClick: (e) => {
        e.stopPropagation();
        mutatation.mutate(id);
      },
      content: <><Trash /> Delete Unit</>
    }
  ];

  return <DropdownAction label='Unit Actions' items={dropdownActionItems} />;
}