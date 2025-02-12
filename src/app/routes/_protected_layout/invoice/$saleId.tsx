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
import { useQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';
import { getConfig } from '@/features/app-config/api/app-config';

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

  const [saleQuery, configQuery] = useQueries({ 
    queries: [
      {
        queryKey: ['sale-' + saleId],
        queryFn: () => getSaleById(saleId)
      },
      {
        queryKey: ['config'],
        queryFn: () => getConfig()
      }
    ]
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
    if (print && saleQuery.isSuccess && configQuery.isSuccess) {
      setTimeout(() => reactToPrintFn(), 500);
    }
  }, [configQuery.isSuccess, print, reactToPrintFn, saleQuery.isSuccess]);

  if (saleQuery.isError || configQuery.isError) {
    return 'error';
  }

  if (saleQuery.isLoading || configQuery.isError) {
    return 'loading';
  }

  if (!saleQuery.data || !configQuery.data) {
    return 'empty';
  }

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='p-4 font-body a4-page' ref={contentRef}>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-[42px]'>INVOICE</h1>
          <InvoiceNumber id={saleQuery.data.id || ''} />
        </div>
        <Separator className='bg-foreground' />
        <div className='gap-8 grid grid-cols-[auto,auto,1fr] py-4'>
          <CompanyLogoName config={configQuery.data} />
          <Separator className='bg-foreground' orientation='vertical' />
          <CompanyInfo config={configQuery.data} />
        </div>
        <Separator className='bg-foreground' />
        <CustomerInfo customer={saleQuery.data.customer} className='my-2' />
        <Separator className='bg-foreground' />
        <VehicleInfo vehicle={saleQuery.data.vehicle} className='my-2' />
        <Separator className='bg-foreground' />
        <div className='flex gap-4 mt-2'>
          <div className='flex items-center gap-4'>
            <InvoiceStatus statusEnum={saleQuery.data.status} />
            <InvoiceDetailElement className={cn([
              'hidden',
              saleQuery.data.status === StatusEnum.HOLD && 'block'
            ])} label='Due By'>
              <span className="font-medium">
                {format(saleQuery.data.dueAt, 'do MMM yyyy, hh:mm aa')}
              </span>
            </InvoiceDetailElement>
          </div>
          <div className='flex gap-2'>
            <InvoiceDetailElement label='Initiated By'>
              <span className="font-medium">
                {saleQuery.data.user.username}
              </span>
            </InvoiceDetailElement>
            <InvoiceDetailElement label='Transaction Time'>
              <span className="font-medium">
                {format(saleQuery.data.createdAt, 'do MMM yyyy, hh:mm aa')}
              </span>
            </InvoiceDetailElement>
          </div>
        </div>
        <InvoiceTable className='mt-10 page-break' sale={convertSaleResponseDtoToSale(saleQuery.data)} />
        <div className='justify-items-stretch gap-8 grid grid-cols-5 mt-[20vh] px-8 text-center'>
          <div className='pt-2 border-t border-t-foreground font-medium'>
            Salesperson
          </div>
          <div className='pt-2 border-t border-t-foreground font-medium'>
            Serviceman
          </div>
          <div></div>
          <div></div>
          <div className='pt-2 border-t border-t-foreground font-medium'>
            Customer
          </div>
        </div>
      </div>
    </div>
  );
}