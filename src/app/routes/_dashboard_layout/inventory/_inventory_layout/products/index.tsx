import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { NewProductButton } from '@/features/product/components/new-product-btn';
import { ProductSearch } from '@/features/product/components/product-search';
import { ProductTable } from '@/features/product/components/product-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/_inventory_layout/products/')({
  component: () => <ProductPage />
});

function ProductPage() {
  return (
    <>
      <SectionHeader className='grid grid-cols-[1fr,2fr]'>
        <TypographyH1>
        Product
        </TypographyH1>
      </SectionHeader>
      <SectionContent className='flex flex-col h-full'>
        <div className='flex justify-between'>
          <ProductSearch className='w-[400px]' />
          <div className='flex flex-row-reverse gap-4'>
            <NewProductButton />
          </div>
        </div>
        <div className='relative flex-grow mt-2 h-full'>
          <ProductTable className='absolute inset-0 h-full' />
        </div>
      </SectionContent>
    </>
  );
}