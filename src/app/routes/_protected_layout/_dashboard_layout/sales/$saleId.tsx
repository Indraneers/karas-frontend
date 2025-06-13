import { LoadingSpinner } from '@/components/loading-spinner';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getSaleById } from '@/features/sale/api/sale';
import { CustomerInformation } from '@/features/sale/components/customer-information';
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

  if (isLoading || !data) {
    return (
      <div className='gap-4 grid grid-cols-1 xl:grid-cols-4 py-4 h-full'>
        <div className='xl:block flex space-x-6 xl:space-x-0 xl:space-y-4'>
          <Card>
            <CardContent className='mt-4'>
              <Skeleton className="w-full h-12" />
              <Skeleton className="mt-2 w-full h-8" />
              <Skeleton className="mt-4 w-[100px] h-8" />
              <Skeleton className="mt-4 w-full h-8" />
            </CardContent>
          </Card>
          <Separator className='mt-3 mb-2' />
          <Card>
            <CardContent className='mt-4'>
              <Skeleton className="w-full h-8" />
              <Skeleton className="mt-2 w-full h-8" />
              <Skeleton className="mt-4 w-full h-8" />
            </CardContent>
          </Card>
          <Separator className='mt-3 mb-2' />
          <Card>
            <CardContent className='mt-4'>
              <Skeleton className="w-full h-8" />
              <Skeleton className="mt-2 w-full h-8" />
              <Skeleton className="mt-4 w-full h-8" />
              <Skeleton className="mt-2 w-full h-8" />
            </CardContent>
          </Card>
        </div>
        <div className='xl:col-span-3 h-full'>
          {
            isLoading &&
          <div className='place-content-center grid h-full'>
            <LoadingSpinner className='w-80 h-80' />
          </div>
          }
        </div>
      </div>
    );
  }

  const sale = convertSaleResponseDtoToSale(data);

  return (
    <div className='gap-4 grid grid-cols-1 xl:grid-cols-4 py-4 h-full'>
      <div className='xl:block flex space-x-4 xl:space-x-0 xl:space-y-4'>
        <Card>
          <CardContent className='mt-4'>
            <SaleInformation sale={sale} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className='mt-4'>
            <CustomerInformation customer={sale.customer} />
          </CardContent>
        </Card>
        <Card className='flex-grow'>
          <CardContent className='mt-4'>
            <VehicleInformation vehicle={sale.vehicle} />
          </CardContent>
        </Card>
      </div>
      <Card className='xl:col-span-3 h-full'>
        <CardContent className='mt-4'>
          <SaleTable sale={sale} />
        </CardContent>
      </Card>
    </div>
  );
}