import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
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
    <>
      <SectionHeader className='grid grid-cols-[1fr,2fr]'>
        <TypographyH1>
        Category
        </TypographyH1>
      </SectionHeader>
      <SectionContent className='flex flex-col h-full'>
        <div className='flex justify-between gap-4'>
          <CategorySearch className='w-[400px]' />
          <div className='flex flex-row-reverse gap-4'>
            <NewCategoryButton />
          </div>
        </div>
        <div className='relative flex-grow mt-2'>
          <CategoryTable className='absolute inset-0 h-full' />
        </div>
      </SectionContent>
    </>
  );
}