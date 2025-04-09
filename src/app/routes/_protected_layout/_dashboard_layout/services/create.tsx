import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { createAutoService } from '@/features/service/api/auto-services';
import { ServiceForm } from '@/features/service/components/service-form';
import { ServiceDto } from '@/features/service/types/service.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/services/create')({
  component: () => <CreateSalePage />
});

function CreateSalePage() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (serviceDto: ServiceDto) => createAutoService(serviceDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['services']
      });
    }
  });

  return (
    <Section>
      <SectionHeader>
        <TypographyH1>
          Create New Service
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        <ServiceForm handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}