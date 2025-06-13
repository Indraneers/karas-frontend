import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { Card, CardContent } from '@/components/ui/card';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { NewServiceButton } from '@/features/service/components/new-service-btn';
import { ServiceTable } from '@/features/service/components/service-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/services/')({
  component: () => <ServicePage />
});

export function ServicePage() {
  return (
    <Section>
      <SectionHeader>
        <TypographyH1>
          Services
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        <Card>
          <CardContent className='mt-4'>
            <div className='flex justify-between'>
              <NewServiceButton />
            </div>
            <ServiceTable className='mt-4' />
          </CardContent>
        </Card>
      </SectionContent>
    </Section>
  );
}