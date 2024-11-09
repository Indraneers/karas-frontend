import { TypographyH1 } from '@/components/ui/typography/h1';
import { CategorySearch } from '@/features/category/components/category-search';
import { CategoryTable } from '@/features/category/components/category-table';
import { NewCategoryButton } from '@/features/category/components/new-category-btn';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/_inventory_layout/categories/')({
  component: () => <CategoryPage />
});

function CategoryPage() {
  return (
    <div>
      <TypographyH1>
        Category
      </TypographyH1>
      <div className='grid grid-cols-2 mt-4'>
        <CategorySearch />
        <div className='flex flex-row-reverse gap-4'>
          <NewCategoryButton />
        </div>
      </div>
      <CategoryTable className='mt-4' />
    </div>
  );
}