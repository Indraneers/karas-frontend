import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { NewSubcategoryButton } from '@/features/subcategory/components/new-subcategory-btn';
import { SubcategorySearch } from '@/features/subcategory/components/subcategory-search';
import { SubcategoryTable } from '@/features/subcategory/components/subcategory-table';
import { useSubcategorySearch } from '@/features/subcategory/hooks/subcategory-search';
import { convertSCDtoToSC } from '@/features/subcategory/utils/convert';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/_inventory_layout/subcategories/')({
  component: () => <SubcategoryPage />
});

export function SubcategoryPage() {
  const { q, setQ, data, isLoading } = useSubcategorySearch();

  const subcategories = data?.map((sc) => convertSCDtoToSC(sc)) || [];
  return (
    <>
      <SectionHeader>
        <TypographyH1>
            Subcategory
        </TypographyH1>
      </SectionHeader>
      <SectionContent className='flex flex-col h-full'>
        <div className='flex justify-between gap-4'>
          <SubcategorySearch
            className='w-[400px]' 
            value={q}
            onChange={setQ}
          />
          <div className='flex flex-row-reverse gap-4'>
            <NewSubcategoryButton />
          </div>
        </div>
        <div className='mt-4'>
          <SubcategoryTable isLoading={isLoading} subcategories={subcategories} />
        </div>

      </SectionContent>
    </>
  );
}