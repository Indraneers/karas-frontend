import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { getUnits } from "../../api/unit";

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
    <div className={cn(className)}>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}