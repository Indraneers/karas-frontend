import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { CustomerTable } from '@/features/customer/components/customer-table';
import { NewCustomerButton } from '@/features/customer/components/new-customer-btn';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/customers/')({
  component: () => <CustomerPage />
});

export function CustomerPage() {
  return (
    <Section className='pt-4'>
      <SectionHeader>
        <TypographyH1>
          Customers
        </TypographyH1>
        <Subtitle>
          Page for handling category creation, deletion,
          and update.
        </Subtitle>
      </SectionHeader>
      <SectionContent>
        <div className='flex justify-between'>
          <div></div>
          <NewCustomerButton />
        </div>
        <CustomerTable className='mt-4' />
      </SectionContent>
    </Section>
  );
}