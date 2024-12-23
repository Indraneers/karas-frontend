import { DeleteButton } from "@/components/delete-button";
import { EditButton } from "@/components/edit-button";
import { VehicleDto } from "../dto/vehicle.dto";

interface VehicleActionsProps {
  id: string;
  handleDelete: (id: string) => Promise<VehicleDto>;
}

export function VehicleActions({ id, handleDelete }: VehicleActionsProps) {
  return (
    <div className="flex gap-4">
      <EditButton to={`/vehicles/edit/` + id} />
      <DeleteButton
        id={id} 
        type="vehicles"
        handleDelete={handleDelete}
      />
    </div>
  );
}