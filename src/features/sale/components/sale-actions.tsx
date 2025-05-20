import { SaleResponseDto } from "../types/sale.dto";
import { BadgeDollarSign, Edit, Printer, Trash2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paySale } from "../api/sale";
import { onClickUrl } from "@/lib/link";
import { DropdownAction, DropdownActionItem } from "@/components/dropdown-action";

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

  const dropdownItems: DropdownActionItem[] = [
    {
      key: 1,
      onClick: (e) => {
        e.stopPropagation();
        payMutation.mutate(id);
      },
      content: <><BadgeDollarSign /> Set Paid</>
    },
    {
      key: 2,
      onClick: (e) => {
        e.stopPropagation();
        (onClickUrl('/invoice/' + id + '?print=true'))();
      },
      content: <><Printer /> Print</>
    },
    {
      key: 3,
      onClick: (e) => {
        e.stopPropagation();
        navigate({ to: '/sales/edit/' + id });
      },
      content: <><Edit /> Edit</>
    },
    {
      key: 4,
      onClick: (e) => {
        e.stopPropagation();
        deleteMutatation.mutate(id);
      },
      content: <><Trash2 /> Delete</>
    }
  ];

  return <DropdownAction label='Sales Action' items={dropdownItems} />;
}