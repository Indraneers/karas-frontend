import { getCategories } from '@/features/category/api/category';
import { useQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { UnitTable } from '@/features/unit/components/unit-table';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { UnitSearch } from '@/features/unit/components/unit-search';
import { NewUnitButton } from '@/features/unit/components/new-unit-button';
import { RestockButton } from '@/features/unit/components/restock-button';

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
    <div className='mt-8'>
      <TypographyH1>
        Unit and Stock
      </TypographyH1>
      <div className='grid grid-cols-2 mt-4'>
        <UnitSearch />
        <div className='flex flex-row-reverse gap-4'>
          <NewUnitButton />
          <RestockButton />
        </div>
      </div>
      <UnitTable className='mt-4' />
    </div>
  );
}