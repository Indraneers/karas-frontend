import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getConfig, setConfig } from '@/features/app-config/api/app-config';
import { AppConfigForm } from '@/features/app-config/components/app-config-form';
import { AppConfig } from '@/features/app-config/types/app-config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/setting/invoice')({
  component: () => <InvoiceSettingPage />
});

export function InvoiceSettingPage() {
  const queryClient = useQueryClient();
  const { isError, isLoading, data } = useQuery({
    queryKey: ['config'],
    queryFn: () => getConfig()
  });

  const mutation = useMutation({
    mutationFn: 
    ({ appConfig, file } : { appConfig: AppConfig, file: File }) => 
      setConfig(appConfig, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['config']
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
          Invoice Setting
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        <AppConfigForm data={data} handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}