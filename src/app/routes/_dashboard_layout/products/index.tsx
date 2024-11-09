import { ProductTable } from '@/features/product/components/product-table.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/products/')({
  component: () => <ProductPage />
});

function ProductPage() {
  return (
    <div>
      <ProductTable />
    </div>
  );
}