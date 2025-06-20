// import { DatePickerWithRange } from '@/components/date-picker-range';
import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { SalesTable } from '@/features/sale/components/sales-table';
import { PaymentType, StatusEnum } from '@/features/sale/types/sale';
import { SaleFilter } from '@/features/sale/types/sale-filter';
import { createFileRoute } from '@tanstack/react-router';
import { SalesPopupFilter } from '@/features/sale/components/sale-filter';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/sales/')({
  component: () => <SalesPage />,
  validateSearch: (search: Record<string, unknown>) : SaleFilter => {
    const parsedCreatedAtFrom = Date.parse(search.createdAtFrom as string);
    const parsedCreatedAtTo = Date.parse(search.createdAtTo as string);
    return {
      createdAtFrom: isNaN(parsedCreatedAtFrom) ? undefined : new Date(parsedCreatedAtFrom),
      createdAtTo: isNaN(parsedCreatedAtTo) ? undefined : new Date(parsedCreatedAtTo),
      customerId: (search.customerId as string) || undefined,
      vehicleId: (search.vehicleId as string) || undefined,
      userId: (search.userID as string) || undefined,
      paymentType: (search.paymentType as PaymentType) || undefined,
      status: (search.status as StatusEnum) || undefined
    };
  }
});

function SalesPage() {
  const saleFilter = Route.useSearch();
  return (
    <Section className='flex flex-col h-full'>
      <SectionHeader>
        <TypographyH1>
        Sales and Orders
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        <SalesPopupFilter />
        <Card className='mt-4'>
          <CardContent className='mt-4'>
            <SalesTable 
              className='mt-4' 
              saleFilter={saleFilter}        
            />
          </CardContent>
        </Card>
      </SectionContent>
    </Section>
  );
}