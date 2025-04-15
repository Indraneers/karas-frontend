import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { convertVehicleDtoToVehicle } from "../../utils/vehicle";
import { VehicleDto } from "../../types/vehicle.dto";
import { PaginationDetail } from "@/types/pagination";
import { useState } from "react";

interface VehicleTableProps {
  className?: string;
  data: VehicleDto[];
  paginationDetail: PaginationDetail;
}

export function VehicleTable({ className, data, paginationDetail } : VehicleTableProps) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  return (
    <div className={className}>
      <DataTablePagination 
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        paginationDetail={paginationDetail} 
        data={data.map(v => convertVehicleDtoToVehicle(v))} 
        columns={columns} 
      />
    </div>
  );
}