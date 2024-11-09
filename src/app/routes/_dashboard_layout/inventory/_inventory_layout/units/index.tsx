import { getCategories } from '@/features/category/api/category';
import { useQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { UnitTable } from '@/features/unit/components/unit-table';
import { TypographyH1 } from '@/components/ui/typography/h1';

export const Route = createFileRoute('/_dashboard_layout/inventory/_inventory_layout/units/')({
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
      <TypographyH1 className='mb-4'>
        Unit and Stock
      </TypographyH1>
      <UnitTable />
    </div>
  );
}