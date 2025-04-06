import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Unit } from "../../types/unit";
import { PaginationDetail } from "@/types/pagination";

interface UnitTablePage {
  className?: string;
  units: Unit[];
  isLoading?: boolean;
  paginationDetail: PaginationDetail;
}

export function UnitTable({ isLoading, className, units, paginationDetail }: UnitTablePage) {
  return (
    <div className={cn([className])}>
      <DataTablePagination paginationDetail={paginationDetail} isLoading={isLoading} columns={columns} data={units} />
    </div>
  );
}