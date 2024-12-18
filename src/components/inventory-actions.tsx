import { DeleteButton } from "./delete-button";
import { EditButton } from "./edit-button";

interface InventoryActionsProps<T> {
  id: string,
  type: 'categories' | 'products' | 'units',
  handleDelete: (d: string) => Promise<T>
}

export function InventoryActions<T>({ id, type, handleDelete }: InventoryActionsProps<T>) {
  return (
    <div className="flex gap-4">
      <EditButton to={'/inventory/' + type + '/edit/' + id} />
      <DeleteButton
        id={id} 
        type={type}
        handleDelete={handleDelete}
      />
    </div>
  );
}