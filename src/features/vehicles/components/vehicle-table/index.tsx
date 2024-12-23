import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { convertVehicleDtoToVehicle } from "../../utils/vehicle";
import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "../../api/vehicle";

export function VehicleTable({ className }: { className?: string }) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => getVehicles()
  });

  if (isError) {
    return 'error';
  }

  if (isLoading) {
    return 'loading';
  }

  if (!data) {
    return 'empty';
  }

  return (
    <div className={className}>
      <DataTablePagination data={data.map(v => convertVehicleDtoToVehicle(v))} columns={columns} />
    </div>
  );
}