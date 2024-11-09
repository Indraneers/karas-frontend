import { TypographyH1 } from '@/components/ui/typography/h1';
import { CategoryTable } from '@/features/category/components/category-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/_inventory_layout/categories/')({
  component: () => <CategoryPage />
});

function CategoryPage() {
  return (
    <div>
      <TypographyH1 className='mb-4'>
        Category
      </TypographyH1>
      <CategoryTable />
    </div>
  );
}