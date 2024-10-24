import { ProductSearch } from '@/components/product-search';

import { NewProductButton } from '@/features/inventory/components/new-product-button';
import { RestockButton } from '@/features/inventory/components/restock-button';
import { SelectCategory } from '@/features/inventory/components/select-category';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/')({
  component: () => <InventoryPage />
});

function InventoryPage() {
  return (
    <div className='py-12'>
      {/* Product Functionalit */}
      <div className='gap-8 grid grid-cols-[3fr,1fr,1fr,1fr]'>
        <ProductSearch className='h-10' />
        <SelectCategory />
        <NewProductButton />
        <RestockButton />
      </div>
    </div>
  );
}