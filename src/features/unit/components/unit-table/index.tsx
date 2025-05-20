import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Unit } from "../../types/unit";
import { PaginationDetail } from "@/types/pagination";
import { useState } from "react";
import { ContextOption } from "@/types/context-options";
import { deleteUnit } from "../../api/unit";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit, Trash } from "lucide-react";

interface UnitTablePage {
  className?: string;
  units: Unit[];
  isLoading?: boolean;
  paginationDetail: PaginationDetail;
}

export function UnitTable({ isLoading, className, units, paginationDetail }: UnitTablePage) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutatation = useMutation({
    mutationFn: async (id: string) => deleteUnit(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['units'] })
  });

  const contextOptions: ContextOption<Unit>[] = [
    {
      key: 1,
      onClick: (unit) => {
        navigate({ to: `/inventory/units/edit/` + unit.id });
      },
      content: <><Edit /> Edit Unit</>
    },
    {
      key: 2,
      onClick: (unit) => {
        mutatation.mutate(unit.id);
      },
      content: <><Trash /> Delete Unit</>
    }
  ];
  return (
    <div className={cn([className])}>
      <DataTablePagination 
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        paginationDetail={paginationDetail} 
        isLoading={isLoading} 
        columns={columns}
        data={units} 
        contextLabel="Unit Actions"
        contextOptions={contextOptions}
      />
    </div>
  );
}