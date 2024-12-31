import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { convertUnitDtoToUnit } from "../../util/convert";
import { Unit } from "../../types/unit";

interface UnitTablePage {
  className?: string;
  units: Unit[]
}

export function UnitTable({ className, units }: UnitTablePage) {
  return (
    <div className={cn([className])}>
      <DataTablePagination columns={columns} data={units.map((u) => convertUnitDtoToUnit(u)) || []} />
    </div>
  );
}