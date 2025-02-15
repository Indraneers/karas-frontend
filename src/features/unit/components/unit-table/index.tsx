import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Unit } from "../../types/unit";

interface UnitTablePage {
  className?: string;
  units: Unit[];
  isLoading?: boolean;
}

export function UnitTable({ isLoading, className, units }: UnitTablePage) {
  return (
    <div className={cn([className])}>
      <DataTablePagination isLoading={isLoading} columns={columns} data={units} />
    </div>
  );
}