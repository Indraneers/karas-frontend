import { Button } from "@/components/ui/button";
import { BadgeDollarSign } from "lucide-react";
import { paySale } from "../api/sale";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function SetPaidButton({ id } : { id: string }) {
  const queryClient = useQueryClient();
  const mutatation = useMutation({
    mutationFn: async (id: string) => paySale(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sales'] })
  });
  return (
    <Button
      className="w-6 h-6"
      onClick={(e) => {
        e.stopPropagation();
        mutatation.mutate(id);
      }} 
      variant="ghost" 
      size="icon"
    >
      <BadgeDollarSign />
    </Button>
  );
}