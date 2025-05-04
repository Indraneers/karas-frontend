import { DatePickerWithRange } from '@/components/date-picker-range';
import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { SalesTable } from '@/features/sale/components/sales-table';
import { SaleSearch } from '@/features/sale/types/sale-search';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/sales/')({
  component: () => <SalesPage />,
  validateSearch: (search: Record<string, unknown>) : SaleSearch => {
    const parsedCreatedAtFrom = Date.parse(search.createdAtFrom as string);
    const parsedCreatedAtTo = Date.parse(search.createdAtTo as string);
    return {
      createdAtFrom: isNaN(parsedCreatedAtFrom) ? undefined : new Date(parsedCreatedAtFrom),
      createdAtTo: isNaN(parsedCreatedAtTo) ? undefined : new Date(parsedCreatedAtTo),
      customerId: (search.customerId as string) || undefined
    };
  }
});

function SalesPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  function onValueChange(dateRange: DateRange | undefined) {
    setDateRange(dateRange);
  }

  return (
    <Section className='flex flex-col h-full'>
      <SectionHeader>
        <TypographyH1>
        Sales and Orders
        </TypographyH1>
        <Subtitle>
          Manage Sales and Order here
        </Subtitle>
      </SectionHeader>
      <SectionContent className='flex flex-col'>
        <div>
          <DatePickerWithRange value={dateRange} onValueChange={onValueChange} />
        </div>
        <div className='relative flex-grow mt-3 h-full'>
          <SalesTable saleSearch={{
            createdAtFrom: dateRange && dateRange.from,
            createdAtTo: dateRange && dateRange.to
          }} className="absolute inset-0 h-full" />
        </div>
      </SectionContent>
    </Section>
  );
}