import { columns } from "./columns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAutoService, getAutoServices } from "../../api/auto-services";
import { convertServiceDtoToService } from "../../utils/service";
import { PageLoading } from "@/components/page-loading";
import { DataTableAutoPagination } from "@/components/data-table-pagination";
import { ContextOption } from "@/types/context-options";
import { useNavigate } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import { Service } from "../../types/service";
import { DeleteWithConfirmation } from "@/components/delete-with-confirmation";

export function ServiceTable({ className }: { className?: string }) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAutoServices(),
  });

  const services = data?.map((s) => convertServiceDtoToService(s));

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (id: string) => deleteAutoService(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });

  const contextOptions: ContextOption<Service>[] = [
    {
      key: 1,
      onClick: (service) => {
        navigate({ to: `/services/edit/` + service.id });
      },
      content: (
        <>
          <Edit /> Edit Service
        </>
      ),
    },
    {
      key: 2,
      content: (service) => (
        <DeleteWithConfirmation
          object="service"
          onConfirm={() => mutation.mutate(service.id || "")}
          isLoading={mutation.isPending}
        />
      ),
    },
  ];

  if (isError) {
    return "error";
  }

  return (
    <div className={className}>
      {(isLoading || !data) && <PageLoading />}
      {!isLoading && data && (
        <DataTableAutoPagination
          data={services || []}
          columns={columns}
          contextLabel="Service Actions"
          contextOptions={contextOptions}
        />
      )}
    </div>
  );
}
