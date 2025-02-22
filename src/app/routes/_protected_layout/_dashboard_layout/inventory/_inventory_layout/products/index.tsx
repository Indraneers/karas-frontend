import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { NewProductButton } from '@/features/product/components/new-product-btn';
import { ProductSearch } from '@/features/product/components/product-search';
import { ProductTable } from '@/features/product/components/product-table';
import { useProductSearch } from '@/features/product/hooks/product-search';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/_inventory_layout/products/')({
  component: () => <ProductPage />
});

function ProductPage() {
  const { q, setQ, data, isLoading } = useProductSearch();
  return (
    <>
      <SectionHeader className='mt-2'>
        <TypographyH1>
        Product
        </TypographyH1>
        <Subtitle>
          Page for handling product creation, deletion,
          and update.
        </Subtitle>
      </SectionHeader>
      <SectionContent className='flex flex-col pt-2 h-full'>
        <div className='flex justify-between'>
          <ProductSearch 
            className='w-[400px]'
            value={q}
            onChange={setQ}
          />
          <div className='flex flex-row-reverse gap-4'>
            <NewProductButton />
          </div>
        </div>
        <div className='relative flex-grow mt-4 h-full'>
          <ProductTable isLoading={isLoading} products={data || []} className='absolute inset-0 h-full' />
        </div>
      </SectionContent>
    </>
  );
}