import { VehicleDto } from "../types/vehicle.dto";
import { DropdownAction } from "@/components/dropdown-action";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";
import { Vehicle } from "../types/vehicle";
import { DropdownActionItem } from "@/types/context-options";

interface VehicleActionsProps {
  value: Vehicle;
  handleDelete: (id: string) => Promise<VehicleDto>;
}

export function VehicleActions({ value, handleDelete }: VehicleActionsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['vehicles'] })
  });

  const dropdownActionItems: DropdownActionItem<Vehicle>[] = [
    {
      key: 1,
      onClick: (vehicle) => {
        navigate({ to: `/vehicles/edit/` + vehicle.id });
      },
      content: <><Edit /> Edit Vehicle</>
    },
    {
      key: 2,
      onClick: (vehicle) => {
        mutatation.mutate(vehicle.id || '');
      },
      content: <><Trash /> Delete Vehicle</>
    }
  ];

  return <DropdownAction label='Vehicle Actions' items={dropdownActionItems} value={value} />;
}