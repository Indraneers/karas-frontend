import { SaleResponseDto } from "../types/sale.dto";
import { BadgeDollarSign, Edit, Printer } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paySale } from "../api/sale";
import { onClickUrl } from "@/lib/link";
import { DropdownAction } from "@/components/dropdown-action";
import { Sale } from "../types/sale";
import { DropdownActionItem } from "@/types/context-options";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";

interface SaleActionsProps {
  value: Sale;
  handleDelete: (d: string) => Promise<SaleResponseDto>;
}

export function SaleActions({ value, handleDelete }: SaleActionsProps) {
  const queryClient = useQueryClient();
  const payMutation = useMutation({
    mutationFn: async (id: string) => paySale(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sales"] }),
  });
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => handleDelete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sales"] }),
  });

  const navigate = useNavigate();

  const dropdownItems: DropdownActionItem<Sale>[] = [
    {
      key: 1,
      onClick: (sale) => {
        payMutation.mutate(sale.id || "");
      },
      content: (
        <>
          <BadgeDollarSign /> Set Paid
        </>
      ),
    },
    {
      key: 2,
      onClick: (sale) => {
        onClickUrl("/invoice/" + sale.id + "?print=true")();
      },
      content: (
        <>
          <Printer /> Print
        </>
      ),
    },
    {
      key: 3,
      onClick: (sale) => {
        navigate({ to: "/sales/edit/" + sale.id });
      },
      content: (
        <>
          <Edit /> Edit
        </>
      ),
    },
    {
      key: 4,
      content: (sale) => (
        <DeleteWithConfirmation
          object="sale"
          onConfirm={() => deleteMutation.mutate(sale.id || "")}
          isLoading={deleteMutation.isPending}
        />
      ),
    },
  ];

  return (
    <DropdownAction label="Sales Action" items={dropdownItems} value={value} />
  );
}
