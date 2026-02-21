import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { convertVehicleDtoToVehicle } from "../../utils/vehicle";
import { VehicleDto } from "../../types/vehicle.dto";
import { PaginationDetail } from "@/types/pagination";
import { useState } from "react";
import { ContextOption } from "@/types/context-options";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import { Vehicle } from "../../types/vehicle";
import { deleteVehicle } from "../../api/vehicle";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";

interface VehicleTableProps {
  className?: string;
  data: VehicleDto[];
  paginationDetail: PaginationDetail;
}

export function VehicleTable({
  className,
  data,
  paginationDetail,
}: VehicleTableProps) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (id: string) => deleteVehicle(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["vehicles"] }),
  });

  const contextOptions: ContextOption<Vehicle>[] = [
    {
      key: 1,
      onClick: (vehicle) => {
        navigate({ to: `/vehicles/edit/` + vehicle.id });
      },
      content: (
        <>
          <Edit /> Edit Vehicle
        </>
      ),
    },
    {
      key: 2,
      content: (vehicle) => (
        <DeleteWithConfirmation
          object="vehicle"
          onConfirm={() => mutation.mutate(vehicle.id || "")}
          isLoading={mutation.isPending}
        />
      ),
    },
  ];
  return (
    <div className={className}>
      <DataTablePagination
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        paginationDetail={paginationDetail}
        data={data.map((v) => convertVehicleDtoToVehicle(v))}
        columns={columns}
        contextLabel="Vehicle Actions"
        contextOptions={contextOptions}
      />
    </div>
  );
}
