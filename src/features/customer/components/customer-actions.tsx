import { DeleteButton } from "@/components/delete-button";
import { EditButton } from "@/components/edit-button";
import { CustomerDto } from "../types/customer.dto";


interface CustomerActionsProps {
  id: string;
  handleDelete: (id: string) => Promise<CustomerDto>;
}

export function CustomerActions({ id, handleDelete }: CustomerActionsProps) {
  return (
    <div className="flex gap-4">
      <EditButton to={`/customers/edit/` + id} />
      <DeleteButton
        id={id} 
        type="customers"
        handleDelete={handleDelete}
      />
    </div>
  );
}