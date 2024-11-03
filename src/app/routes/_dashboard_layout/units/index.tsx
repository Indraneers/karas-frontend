import { getCategories } from '@/features/category/api/category';
import { CategoryList } from '@/features/unit/components/category-list';

import { NewUnitButton } from '@/features/unit/components/new-unit-button';
import { RestockButton } from '@/features/unit/components/restock-button';
import { useQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { UnitSearch } from '@/features/unit/components/unit-search';
import { UnitTable } from '@/features/unit/components/unit-table';

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
      <div className='gap-8 grid grid-cols-2'>
        <UnitSearch className='h-10' />
      </div>
      {/* Category List and Filter */}
      <CategoryList className='mt-6' categories={categoryResult.data} />
      {/* Action buttons */}
      <div className='flex justify-end gap-4'>
        <RestockButton />
        <NewUnitButton />
      </div>
      {/* Unit Datatable */}
      <UnitTable className='mt-8' />
    </div>
  );
}