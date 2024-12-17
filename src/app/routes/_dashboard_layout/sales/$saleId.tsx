import { getSaleById } from '@/features/sale/api/sale';
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

  console.log(data);

  return (
    <div>
      done!
    </div>
  );
}