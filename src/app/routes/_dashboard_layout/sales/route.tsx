import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { SalesTable } from '@/features/sale/components/sales-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/sales')({
  component: () => <SalesPage />
});

function SalesPage() {
  return (
    <Section>
      <SectionHeader className='grid grid-cols-[1fr,2fr]'>
        <TypographyH1>
        Sales and Orders
        </TypographyH1>
      </SectionHeader>
      <SectionContent className='flex flex-col h-full'>
        <div className='relative flex-grow mt-2'>
          <SalesTable />
        </div>
      </SectionContent>
    </Section>
  );
}