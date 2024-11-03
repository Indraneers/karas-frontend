import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { InventoryDataTable } from "../../../../components/inventory-data-table";
import { useQuery } from "@tanstack/react-query";
import { getUnits } from "../../api/unit";

interface InventoryTablePage {
  className?: string;
}

export function UnitTable({ className }: InventoryTablePage) {
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
      <InventoryDataTable columns={columns} data={data || []} />
    </div>
  );
}