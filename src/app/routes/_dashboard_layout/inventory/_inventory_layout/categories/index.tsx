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
        <div className='gap-4 grid grid-cols-[1fr,auto]'>
          <CategorySearch className='w-full' />
          <div className='flex flex-row-reverse gap-4'>
            <NewCategoryButton />
          </div>
        </div>
      </SectionHeader>
      <SectionContent className='h-full'>
        <div className='relative h-full'>
          <CategoryTable className='absolute inset-0 h-full' />
        </div>
      </SectionContent>
    </>
  );
}