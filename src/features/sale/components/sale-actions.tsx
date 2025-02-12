import { SaleResponseDto } from "../types/sale.dto";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign, Edit, Ellipsis, Printer, Trash2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paySale } from "../api/sale";
import { onClickUrl } from "@/lib/link";

interface SaleActionsProps {
  id: string,
  handleDelete: (d: string) => Promise<SaleResponseDto>
}

export function SaleActions({ id, handleDelete }: SaleActionsProps) {
  const queryClient = useQueryClient();
  const payMutation = useMutation({
    mutationFn: async (id: string) => paySale(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sales'] })
  });
  const deleteMutatation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sales'] })
  });

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'><Ellipsis/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>Sale Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation();
            payMutation.mutate(id);
          }}>
            <BadgeDollarSign /> Set Paid
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation();
            (onClickUrl('/invoice/' + id + '?print=true'))();
          }}>
            <Printer /> Print
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation();
            navigate({ to: '/sales/edit/' + id });
          }}>
            <Edit /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => {
            e.stopPropagation();
            deleteMutatation.mutate(id);
          }}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}