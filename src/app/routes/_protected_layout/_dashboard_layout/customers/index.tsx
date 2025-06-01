import { PageLoading } from '@/components/page-loading';
import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getCustomers } from '@/features/customer/api/customer';
import { CustomerSearch } from '@/features/customer/components/customer-search';
import { CustomerTable } from '@/features/customer/components/customer-table';
import { NewCustomerButton } from '@/features/customer/components/new-customer-btn';
import { useSearchPagination } from '@/hooks/use-search-pagination';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/customers/')({
  component: () => <CustomerPage />
});

export function CustomerPage() {
  const { 
    q, 
    setQ, 
    data, 
    isLoading, 
    ...paginationDetail
  } = useSearchPagination({ getEntity: getCustomers, key: ['customers'] });
  return (
    <Section>
      <SectionHeader>
        <TypographyH1>
          Customers
        </TypographyH1>
        <Subtitle>
          Page for handling customer creation, deletion,
          and update.
        </Subtitle>
      </SectionHeader>
      <SectionContent>
        <div className='flex justify-between'>
          <CustomerSearch 
            value={q}
            onChange={setQ}
            className='w-[400px]' 
          />
          <NewCustomerButton />
        </div>
        {
          (isLoading || !data) &&
            <PageLoading />
        }
        {
          !isLoading && data &&
          <CustomerTable data={data.content} paginationDetail={paginationDetail} className='mt-4' />
        }
      </SectionContent>
    </Section>
  );
}