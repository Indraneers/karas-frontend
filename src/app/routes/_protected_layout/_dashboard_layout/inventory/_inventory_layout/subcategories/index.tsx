import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { SubcategorySearch } from '@/features/subcategory/components/subcategory-search';
import { SubcategoryTable } from '@/features/subcategory/components/subcategory-table';
import { useSubcategorySearch } from '@/features/subcategory/hooks/subcategory-search';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/_inventory_layout/subcategories/')({
  component: () => <SubcategoryPage />
});

export function SubcategoryPage() {
  const { q, setQ, data } = useSubcategorySearch();
  return (
    <>
      <SectionHeader className='mt-2'>
        <TypographyH1>
            Subcategory
        </TypographyH1>
        <Subtitle>
              Page for handling subcategory creation, deletion,
              and update.
        </Subtitle>
      </SectionHeader>
      <SectionContent className='flex flex-col pt-2 h-full'>
        <div className='flex justify-between gap-4'>
          <SubcategorySearch
            className='w-[400px]' 
            value={q}
            onChange={setQ}
          />
          <div className='flex flex-row-reverse gap-4'>

          </div>
        </div>
        <div className='relative flex-grow mt-4'>
          <SubcategoryTable subcategories={data || []} className='absolute inset-0 h-full' />
        </div>
      </SectionContent>
    </>
  );
}