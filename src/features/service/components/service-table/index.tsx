import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getAutoServices } from "../../api/auto-services";
import { convertServiceDtoToService } from "../../utils/service";
import { PageLoading } from "@/components/page-loading";
import { DataTableAutoPagination } from "@/components/data-table-pagination";

export function ServiceTable({ className } : { className?: string }) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['services'],
    queryFn: () => getAutoServices()
  });

  if (isError) {
    return 'error';
  }
  
  const services = data?.map(s => convertServiceDtoToService(s));

  return (
    <div className={className}>
      {(isLoading || !data) &&
        <PageLoading />
      }
      {
        !isLoading && data &&
        <DataTableAutoPagination data={services || []} columns={columns} />
      }
    </div>
  );
}