import { CategoryTable } from '@/features/category/components/category-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/categories/')({
  component: () => <CategoryPage />
});

function CategoryPage() {
  return (
    <div>
      <CategoryTable />
    </div>
  );
}