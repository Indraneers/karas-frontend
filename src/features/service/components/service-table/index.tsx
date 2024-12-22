import { DataTablePagination } from "@/components/data-table-pagination";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getAutoServices } from "../../api/auto-services";
import { convertServiceDtoToService } from "../../utils/service";

export function ServiceTable({ className } : { className?: string }) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['services'],
    queryFn: () => getAutoServices()
  });

  if (isError) {
    return 'error';
  }

  if (isLoading) {
    return 'loading';
  }

  const services = data?.map(s => convertServiceDtoToService(s));

  return (
    <div className={className}>
      <DataTablePagination data={services || []} columns={columns} />
    </div>
  );
}