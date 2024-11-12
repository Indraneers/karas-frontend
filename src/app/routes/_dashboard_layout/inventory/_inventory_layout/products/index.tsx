import { TypographyH1 } from '@/components/ui/typography/h1';
import { NewProductButton } from '@/features/product/components/new-product-btn';
import { ProductSearch } from '@/features/product/components/product-search';
import { ProductTable } from '@/features/product/components/product-table.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/_inventory_layout/products/')({
  component: () => <ProductPage />
});

function ProductPage() {
  return (
    <div className='mt-8'>
      <TypographyH1>
        Product
      </TypographyH1>
      <div className='grid grid-cols-2 mt-4'>
        <ProductSearch />
        <div className='flex flex-row-reverse gap-4'>
          <NewProductButton />
        </div>
      </div>
      <ProductTable className='mt-4' />
    </div>
  );
}