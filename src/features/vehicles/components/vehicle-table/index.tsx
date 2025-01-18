import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { convertVehicleDtoToVehicle } from "../../utils/vehicle";
import { VehicleDto } from "../../dto/vehicle.dto";

export function VehicleTable({ className, data }: { className?: string, data: VehicleDto[] }) {
  return (
    <div className={className}>
      <DataTablePagination data={data.map(v => convertVehicleDtoToVehicle(v))} columns={columns} />
    </div>
  );
}