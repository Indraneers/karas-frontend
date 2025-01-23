import { DeleteButton } from "@/components/delete-button";
import { SaleResponseDto } from "../types/sale.dto";
import { EditButton } from "@/components/edit-button";
import { PrintButton } from "@/components/print-button";

interface SaleActionsProps {
  id: string,
  handleDelete: (d: string) => Promise<SaleResponseDto>
}

export function SaleActions({ id, handleDelete }: SaleActionsProps) {
  return (
    <div className="flex gap-4">
      <PrintButton to={'/invoice/' + id + '?print=true'} />
      <EditButton to={`/sales/edit/` + id} />
      <DeleteButton
        id={id} 
        type="sales"
        handleDelete={handleDelete}
      />
    </div>
  );
}