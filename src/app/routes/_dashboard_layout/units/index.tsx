import { ProductSearch } from '@/components/product-search';
import { getCategories } from '@/features/unit/api/inventory';
import { CategoryList } from '@/features/unit/components/category-list';
import { InventoryTable } from '@/features/unit/components/unit-table';

import { NewProductButton } from '@/features/unit/components/new-product-button';
import { RestockButton } from '@/features/unit/components/restock-button';
import { SelectCategory } from '@/features/unit/components/select-category';
import { useQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/units/')({
  component: () => <InventoryPage />
});

function InventoryPage() {
  const [ categoryResult ] = useQueries({
    queries: [
      {
        queryKey: ['categories'],
        queryFn: async () => await getCategories()
      }
    ]
  });

  if (categoryResult.isError) {
    console.log(categoryResult);
    return "error";
  }

  if (categoryResult.isLoading) {
    return "loading";
  }

  console.log(categoryResult.data);

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
      <CategoryList className='mt-6' categories={categoryResult.data} />
      {/* Product Datatable */}
      <InventoryTable className='mt-8' />
    </div>
  );
}