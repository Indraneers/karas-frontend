import { LoadingSpinner } from '@/components/loading-spinner';
import { Separator } from '@/components/ui/separator';
import { getSaleById } from '@/features/sale/api/sale';
import { CustomerInformation } from '@/features/sale/components/customer-information';
import { SaleDetailAside } from '@/features/sale/components/sale-detail-aside';
import { SaleInformation } from '@/features/sale/components/sale-information';
import { SaleTable } from '@/features/sale/components/sale-table';
import { VehicleInformation } from '@/features/sale/components/vehicle-information';
import { convertSaleResponseDtoToSale } from '@/features/sale/utils/sale';
import { onClickUrl } from '@/lib/link';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

interface SaleDetailSearch {
  print: boolean;
}

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/sales/$saleId')({
  component: () => <SaleDetailPage />,
  validateSearch: (search: Record<string, unknown>): SaleDetailSearch => {
    return {
      print: Boolean(search.print) || false
    };
  }
});

function SaleDetailPage() {
  const [hasRun, setHasRun] = useState(false);
  const { saleId } = Route.useParams();
  const { print } = Route.useSearch();
  const { isError, isLoading, data, isSuccess } = useQuery({
    queryKey: ['sale-', saleId],
    queryFn: () => getSaleById(saleId)
  });

  const goToPrint = onClickUrl('/invoice/' + saleId + '?print=true');

  useEffect(() => {
    if (!hasRun && print && isSuccess) {
      goToPrint();
      setHasRun(true);
    }
  }, [goToPrint, hasRun, isSuccess, print, setHasRun]);


  if (isError) {
    return 'error';
  }

  const sale = convertSaleResponseDtoToSale(data);

  return (
    <div className='gap-4 grid grid-cols-3 py-4 h-full'>
      <SaleDetailAside className='h-full'>
        <SaleInformation isLoading={isLoading} sale={sale} />
        <Separator className='mt-3 mb-2' />
        <CustomerInformation isLoading={isLoading} customer={sale ? sale.customer : null} />
        <Separator className='mt-3 mb-2' />
        <VehicleInformation isLoading={isLoading} vehicle={sale ? sale.vehicle : null} />
      </SaleDetailAside>
      <div className='col-span-2 h-full'>
        {
          isLoading &&
          <div className='place-content-center grid h-full'>
            <LoadingSpinner className='w-80 h-80' />
          </div>
        }
        {
          !isLoading && sale &&
          <SaleTable sale={sale} />
        }
      </div>
    </div>
  );
}