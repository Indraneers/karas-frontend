import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { NewServiceButton } from '@/features/service/components/new-service-btn';
import { ServiceTable } from '@/features/service/components/service-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/services/')({
  component: () => <ServicePage />
});

export function ServicePage() {
  return (
    <Section className='mt-4'>
      <SectionHeader>
        <TypographyH1>
          Services
        </TypographyH1>
        <Subtitle>
          Page for handling category creation, deletion,
          and update.
        </Subtitle>
      </SectionHeader>
      <SectionContent>
        <div className='flex justify-between'>
          <div></div>
          <NewServiceButton />
        </div>
        <ServiceTable className='mt-4' />
      </SectionContent>
    </Section>
  );
}