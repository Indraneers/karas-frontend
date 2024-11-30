import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getUnits } from "../../api/unit";
import { DataTablePagination } from "@/components/data-table-pagination";

interface UnitTablePage {
  className?: string;
}

export function UnitTable({ className }: UnitTablePage) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['units'],
    queryFn: async () => await getUnits()
  });

  if (isError) {
    return 'error';
  }

  if (isLoading) {
    return 'loading';
  }

  return (
    <div className={cn([className])}>
      <DataTablePagination columns={columns} data={data || []} />
    </div>
  );
}