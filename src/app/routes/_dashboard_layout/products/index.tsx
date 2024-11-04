import { ProductSearch } from '@/components/product-search';
import { NewProductButton } from '@/features/product/components/new-product-btn';
import { ProductTable } from '@/features/product/components/product-table.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/products/')({
  component: () => <ProductPage />
});

function ProductPage() {
  return (
    <div className='py-12'>
      <div className='gap-8 grid grid-cols-2'>
        <ProductSearch className='h-10' />
        <div className='flex justify-end'>
          {/* Action buttons */}
          <NewProductButton />
        </div>
      </div>
      {/* Product Datatable */}
      <ProductTable className='mt-8' />
    </div>
  );
}