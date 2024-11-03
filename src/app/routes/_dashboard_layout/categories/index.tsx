import { CategorySearch } from '@/features/category/components/category-search';
import { CategoryTable } from '@/features/category/components/category-table';
import { NewCategoryButton } from '@/features/category/components/new-category-btn';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/categories/')({
  component: () => <CategoryPage />
});

function CategoryPage() {
  return (
    <div className='py-12'>
      <div className='gap-8 grid grid-cols-2'>
        <CategorySearch className='h-10' />
      </div>
      {/* Action buttons */}
      <div className='flex justify-end gap-4'>
        <NewCategoryButton />
      </div>
      {/* Unit Datatable */}
      <CategoryTable className='mt-8' />
    </div>
  );
}