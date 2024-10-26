import { ProductSearch } from '@/components/product-search';
import { CategoryList } from '@/features/inventory/components/category-list';
import { InventoryTable } from '@/features/inventory/components/inventory-table';

import { NewProductButton } from '@/features/inventory/components/new-product-button';
import { RestockButton } from '@/features/inventory/components/restock-button';
import { SelectCategory } from '@/features/inventory/components/select-category';
import { categories } from '@/features/inventory/data/sample-categories';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/')({
  component: () => <InventoryPage />
});

function InventoryPage() {
  return (
    <div className='py-12'>
      {/* Product Functionality */}
      <div className='gap-8 grid grid-cols-[3fr,1fr,1fr,1fr]'>
        <ProductSearch className='h-10' />
        <SelectCategory />
        <NewProductButton />
        <RestockButton />
      </div>
      {/* Category List and Filter */}
      <CategoryList className='mt-6' categories={categories} />
      {/* Product Datatable */}
      <InventoryTable className='mt-8' />
    </div>
  );
}