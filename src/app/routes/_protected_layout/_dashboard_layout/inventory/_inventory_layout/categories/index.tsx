import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { CategorySearch } from '@/features/category/components/category-search';
import { CategoryTable } from '@/features/category/components/category-table';
import { NewCategoryButton } from '@/features/category/components/new-category-btn';
import { useCategorySearch } from '@/features/category/hooks/category-search';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/_inventory_layout/categories/')({
  component: () => <CategoryPage />
});
  
function CategoryPage() {
  const { q, setQ,  data } = useCategorySearch();
  return (
    <>
      <SectionHeader className='mt-2'>
        <TypographyH1>
        Category
        </TypographyH1>
        <Subtitle>
          Page for handling category creation, deletion,
          and update.
        </Subtitle>
      </SectionHeader>
      <SectionContent className='flex flex-col pt-2 h-full'>
        <div className='flex justify-between gap-4'>
          <CategorySearch
            className='w-[400px]' 
            value={q}
            onChange={setQ}
          />
          <div className='flex flex-row-reverse gap-4'>
            <NewCategoryButton />
          </div>
        </div>
        <div className='relative flex-grow mt-4'>
          <CategoryTable categories={data || []} className='absolute inset-0 h-full' />
        </div>
      </SectionContent>
    </>
  );
}