import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { DeleteButton } from "./delete-button";

interface InventoryActionsProps<T> {
  id: string,
  type: 'categories' | 'products' | 'units',
  handleDelete: (d: string) => Promise<T>
}

export function InventoryActions<T>({ id, type, handleDelete }: InventoryActionsProps<T>) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <Button
        className="w-6 h-6"
        variant='ghost' 
        onClick={() => navigate({ to: `/inventory/${ type }/edit/` + id })}
        size="icon"
      >
        <Edit />
      </Button>
      <DeleteButton
        id={id} 
        type="categories"
        handleDelete={handleDelete}
      />
    </div>
  );
}