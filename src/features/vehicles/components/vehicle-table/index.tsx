import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { convertVehicleDtoToVehicle } from "../../utils/vehicle";
import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "../../api/vehicle";
import { PageLoading } from "@/components/page-loading";

export function VehicleTable({ className }: { className?: string }) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => getVehicles()
  });

  if (isError) {
    return 'error';
  }

  return (
    <div className={className}>
      {(isLoading || !data) &&
        <PageLoading />
      }
      {
        !isLoading && data && (
          <DataTablePagination data={data.map(v => convertVehicleDtoToVehicle(v))} columns={columns} />
        )
      }
    </div>
  );
}