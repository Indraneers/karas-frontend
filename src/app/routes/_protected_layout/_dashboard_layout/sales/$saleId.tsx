import { Separator } from '@/components/ui/separator';
import { getSaleById } from '@/features/sale/api/sale';
import { CustomerInformation } from '@/features/sale/components/customer-information';
import { ItemsTable } from '@/features/sale/components/items-table';
import { PrintPreview } from '@/features/sale/components/print-preview';
import { SaleDetailAside } from '@/features/sale/components/sale-detail-aside';
import { SaleInformation } from '@/features/sale/components/sale-information';
import { VehicleInformation } from '@/features/sale/components/vehicle-information';
import { convertSaleResponseDtoToSale } from '@/features/sale/utils/sale';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/sales/$saleId')({
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
    <div className='gap-4 grid grid-cols-3 py-4 h-full'>
      <div className='gap-4 grid grid-rows-[auto,1fr]'>
        <SaleDetailAside className='h-full'>
          <SaleInformation sale={sale} />
          <Separator className='mt-3 mb-2' />
          <CustomerInformation customer={sale.customer} />
          <Separator className='mt-3 mb-2' />
          <VehicleInformation vehicle={sale.vehicle} />
        </SaleDetailAside>
        <PrintPreview />
      </div>
      <div className='col-span-2 h-full'>
        <ItemsTable sale={sale} />
      </div>
    </div>
  );
}