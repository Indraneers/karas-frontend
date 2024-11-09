import { TypographyH1 } from '@/components/ui/typography/h1';
import { ProductTable } from '@/features/product/components/product-table.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/_inventory_layout/products/')({
  component: () => <ProductPage />
});

function ProductPage() {
  return (
    <div>
      <TypographyH1 className='mb-4'>
        Product
      </TypographyH1>
      <ProductTable />
    </div>
  );
}