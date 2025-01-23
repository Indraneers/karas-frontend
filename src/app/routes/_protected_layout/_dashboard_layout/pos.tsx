import { createFileRoute } from '@tanstack/react-router';
import { PosForm } from '@/features/pos/components/pos-form';
import { createSale } from '@/features/sale/api/sale';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/pos')({
  component: () => <PosPage />
});

export function PosPage() {
  return (
    <PosForm handlePayment={createSale} />
  );
}