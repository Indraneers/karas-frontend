import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Skeleton } from '@/components/ui/skeleton';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getAutoServiceById, updateAutoService } from '@/features/service/api/auto-services';
import { ServiceForm } from '@/features/service/components/service-form';
import { ServiceDto } from '@/features/service/types/service.dto';
import { convertServiceDtoToServiceForm } from '@/features/service/utils/service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/services/edit/$serviceId')({
  component: () => <EditServicePage />
});

export function EditServicePage() {
  const { serviceId } = Route.useParams();

  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['service-' + serviceId],
    queryFn: () => getAutoServiceById(serviceId)
  });

  const mutation = useMutation({
    mutationFn: (serviceDto: ServiceDto) => updateAutoService(serviceId, serviceDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['services']
      });
      queryClient.invalidateQueries({
        queryKey: ['service-' + serviceId]
      });
    }
  });

  if (isError) {
    return 'error';
  }

  if (isLoading) {
    return 'loading';
  }

  if (!data) {
    return 'empty';
  }

  return (
    <Section className='pt-4'>
      <SectionHeader>
        <TypographyH1>
            Create New Service
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        {
          isLoading &&
          <div>
            <Skeleton className='w-[375px] h-8' />
            <Skeleton className='mt-8 w-[100px] h-8' />
            <Skeleton className='mt-8 w-[375px] h-20' />
          </div>
        }
        { !isLoading && data &&
        <ServiceForm data={convertServiceDtoToServiceForm(data)} handleSubmit={mutation.mutate} />
        }
      </SectionContent>
    </Section>
  );
}