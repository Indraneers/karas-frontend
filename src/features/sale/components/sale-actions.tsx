import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { DeleteButton } from "@/components/delete-button";
import { SaleResponseDto } from "../types/sale.dto";

interface SaleActionsProps {
  id: string,
  handleDelete: (d: string) => Promise<SaleResponseDto>
}

export function SaleActions({ id, handleDelete }: SaleActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <Button
        className="w-6 h-6"
        variant='ghost' 
        onClick={(e) => {
          e.stopPropagation();
          navigate({ to: `/sales/edit/` + id });
        }}
        size="icon"
      >
        <Edit />
      </Button>
      <DeleteButton
        id={id} 
        type="sales"
        handleDelete={handleDelete}
      />
    </div>
  );
}