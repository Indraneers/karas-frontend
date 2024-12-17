import { Separator } from '@/components/ui/separator';
import { getSaleById } from '@/features/sale/api/sale';
import { CustomerInformation } from '@/features/sale/components/customer-information';
import { SaleDetailAside } from '@/features/sale/components/sale-detail-aside';
import { SaleInformation } from '@/features/sale/components/sale-information';
import { VehicleInformation } from '@/features/sale/components/vehicle-information';
import { convertSaleResponseDtoToSale } from '@/features/sale/utils/sale';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/sales/$saleId')({
  component: () => <SaleDetailPage />
});

function SaleDetailPage() {
  const { saleId } = Route.useParams();
  const { isError, isLoading, data } = useQuery({
    queryKey: ['sale-', saleId],
    queryFn: () => getSaleById(saleId)
  });

  if (isError) {
    return 'error';
  }

  if (isLoading) {
    return 'loading';
  }

  if (!data) {
    return 'empty';
  }

  const sale = convertSaleResponseDtoToSale(data);

  return (
    <div className='grid grid-cols-3 py-4 h-full'>
      <SaleDetailAside className='col-span-1'>
        <SaleInformation sale={sale} />
        <Separator className='my-4' />
        <CustomerInformation customer={sale.customer} />
        <Separator className='my-4' />
        <VehicleInformation vehicle={sale.vehicle} />
      </SaleDetailAside>
    </div>
  );
}