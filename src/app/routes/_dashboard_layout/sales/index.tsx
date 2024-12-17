import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { SalesTable } from '@/features/sale/components/sales-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/sales/')({
  component: () => <SalesPage />
});

function SalesPage() {
  return (
    <Section className='flex flex-col h-full'>
      <SectionHeader>
        <TypographyH1 className='mt-4'>
        Sales and Orders
        </TypographyH1>
        <Subtitle>
          Manage Sales and Order here
        </Subtitle>
      </SectionHeader>
      <SectionContent className='flex flex-col'>
        <div className='relative flex-grow h-full'>
          <SalesTable className="absolute inset-0 h-full" />
        </div>
      </SectionContent>
    </Section>
  );
}