import { PosForm } from '@/features/pos/components/pos-form';
import { updateSale } from '@/features/sale/api/sale';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/sales/edit/$saleId')({
  component: () => <SaleEditPage />
});

export function SaleEditPage() {
  const { saleId } = Route.useParams();

  return (
    <PosForm saleId={saleId} handlePayment={updateSale} />
  );
}