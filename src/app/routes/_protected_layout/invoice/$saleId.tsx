import { Separator } from '@/components/ui/separator';
import { CompanyInfo } from '@/features/invoice/components/company-info';
import { CompanyLogoName } from '@/features/invoice/components/company-logo-name';
import { CustomerInfo } from '@/features/invoice/components/customer-info';
import { InvoiceDetailElement } from '@/features/invoice/components/invoice-detail-element';
import { InvoiceNumber } from '@/features/invoice/components/invoice-number';
import { InvoiceStatus } from '@/features/invoice/components/invoice-status';
import { InvoiceTable } from '@/features/invoice/components/invoice-table.tsx';
import { VehicleInfo } from '@/features/invoice/components/vehicle-info';
import { getSaleById } from '@/features/sale/api/sale';
import { StatusEnum } from '@/features/sale/types/sale';
import { convertSaleResponseDtoToSale } from '@/features/sale/utils/sale';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';

interface InvoiceSearch {
  print: boolean;
}

export const Route = createFileRoute('/_protected_layout/invoice/$saleId')({
  component: () => <InvoicePage />,
  validateSearch: (search: Record<string, unknown>): InvoiceSearch => {
    return {
      print: Boolean(search.print) || false
    };
  }
});

export function InvoicePage() {
  const { saleId } = Route.useParams();
  const { print } = Route.useSearch();

  const { isError, isLoading, isSuccess, data } = useQuery({
    queryKey: ['sale-' + saleId],
    queryFn: () => getSaleById(saleId)
  });
  
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ 
    contentRef, 
    onAfterPrint: () => {
      window.open("", "_self");
      window.close();
    } 
  });

  useEffect(() => {
    if (print && isSuccess) {
      setTimeout(() => reactToPrintFn(), 500);
    }
  }, [print, reactToPrintFn, isSuccess]);

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
    <div className='flex justify-center items-center w-full'>
      <div className='p-4 border font-body a4-page' ref={contentRef}>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-[42px]'>INVOICE</h1>
          <InvoiceNumber id={data.id || ''} />
        </div>
        <Separator className='mt-2' />
        <div className='gap-8 grid grid-cols-[auto,auto,1fr] py-4'>
          <CompanyLogoName />
          <Separator orientation='vertical' />
          <CompanyInfo />
        </div>
        <Separator />
        <CustomerInfo customer={data.customer} className='my-2' />
        <Separator />
        <VehicleInfo vehicle={data.vehicle} className='my-2' />
        <Separator />
        <div className='flex justify-between mt-2'>
          <div className='flex items-center gap-2'>
            <InvoiceStatus statusEnum={data.status} />
            <InvoiceDetailElement className={cn([
              'hidden',
              data.status === StatusEnum.HOLD && 'block'
            ])} label='Due By'>
              <span className="font-medium">
                {format(data.dueAt, 'do MMM yyyy, hh:mm aa')}
              </span>
            </InvoiceDetailElement>
          </div>
          <div className='flex gap-2'>
            <InvoiceDetailElement label='Initiated By'>
              <span className="font-medium">
                {data.user.username}
              </span>
            </InvoiceDetailElement>
            <InvoiceDetailElement label='Transaction Time'>
              <span className="font-medium">
                {format(data.createdAt, 'do MMM yyyy, hh:mm aa')}
              </span>
            </InvoiceDetailElement>
          </div>
        </div>
        <InvoiceTable className='mt-10 page-break' sale={convertSaleResponseDtoToSale(data)} />
      </div>
    </div>
  );
}