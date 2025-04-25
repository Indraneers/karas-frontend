import { InfoField } from '@/components/info-field';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TypographyH2 } from '@/components/ui/typography/h2';
import { getCustomerById, getCustomerSalesThroughCustomerId } from '@/features/customer/api/customer';
import { SalesTable } from '@/features/sale/components/sales-table';
import { getVehiclesByCustomerId } from '@/features/vehicle/api/vehicle';
import { VehicleItem } from '@/features/vehicle/components/vehicle-item';
import { useQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/customers/$customerId')({
  component: () => <CustomerDetailPage />
});

function CustomerDetailPage() {
  const { customerId } = Route.useParams();
  const [
    customerQuery,
    vehicleQuery
  ] = useQueries({
    queries: [
      {
        queryKey: ['customer', customerId],
        queryFn: () => getCustomerById(customerId)
      },
      {
        queryKey: ['vehicles-customer', customerId],
        queryFn: async () => await getVehiclesByCustomerId(customerId)
      }
    ]
  });

  if (customerQuery.isLoading || vehicleQuery.isLoading) {
    return (
      <div className='gap-4 grid grid-cols-4'>
        <div>
          <Card className='px-1'>
            <CardHeader>
              <Skeleton className='w-full h-5' />
            </CardHeader>
            <CardContent>
              <Skeleton className='w-full h-4' />
              <Skeleton className='mt-1 w-full h-4' />
              <Skeleton className='mt-2 w-full h-4' />
              <Skeleton className='mt-1 w-full h-4' />
              <Skeleton className='mt-1 w-full h-4' />
            </CardContent>
          </Card>
          <Card className='mt-2 px-1'>
            <CardHeader>
              <TypographyH2>
                Vehicles
              </TypographyH2>
            </CardHeader>
            <CardContent>
              <ul className='space-y-2 list-none'>
                <Skeleton className='w-full h-12' />
                <Skeleton className='mt-2 w-full h-12' />
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className='col-span-3'>

        </div>
      </div>
    );
  }

  return (
    <div className='gap-4 grid grid-cols-4'>
      <div>
        <Card className='px-1'>
          <CardHeader>
            <TypographyH2>
              {customerQuery.data?.name || '-'}
            </TypographyH2>
          </CardHeader>
          <CardContent>
            <InfoField label='Phone Number'>
              {customerQuery.data?.contact || '-'}
            </InfoField>
            <InfoField className='mt-2' label='Address'>
              {customerQuery.data?.address || '-'}
            </InfoField>
          </CardContent>
        </Card>
        <Card className='mt-2 px-1'>
          <CardHeader>
            <TypographyH2>
              Vehicles
            </TypographyH2>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2 list-none'>
              {vehicleQuery.data ?
                vehicleQuery.data.map(v => (
                  <VehicleItem showCustomer={false} vehicle={v} key={v.id} />
                ))
                :
                []
              }
            </ul>
          </CardContent>  
        </Card>
      </div>
      <div className='col-span-3'>
        <SalesTable getSalesFn={getCustomerSalesThroughCustomerId(customerId)} />
      </div>
    </div>
  );
}
