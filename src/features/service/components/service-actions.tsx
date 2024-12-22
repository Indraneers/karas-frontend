import { DeleteButton } from "@/components/delete-button";
import { EditButton } from "@/components/edit-button";
import { ServiceDto } from "../types/service.dto";

interface ServiceActionsProps {
  id: string;
  handleDelete: (id: string) => Promise<ServiceDto>;
}

export function ServiceActions({ id, handleDelete }: ServiceActionsProps) {
  return (
    <div className="flex gap-4">
      <EditButton to={`/services/edit/` + id} />
      <DeleteButton
        id={id} 
        type="services"
        handleDelete={handleDelete}
      />
    </div>
  );
}