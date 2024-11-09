import { getCategories } from '@/features/category/api/category';
import { useQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { UnitTable } from '@/features/unit/components/unit-table';

export const Route = createFileRoute('/_dashboard_layout/units/')({
  component: () => <UnitPage />
});

function UnitPage() {
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

  return (
    <div>
      {/* Unit Datatable */}
      <UnitTable />
    </div>
  );
}