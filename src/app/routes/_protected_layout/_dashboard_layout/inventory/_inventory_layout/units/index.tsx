import { createFileRoute } from '@tanstack/react-router';
import { UnitTable } from '@/features/unit/components/unit-table/index';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { NewUnitButton } from '@/features/unit/components/new-unit-button';
import { RestockButton } from '@/features/unit/components/restock-button';
import { SectionHeader } from '@/components/section-header';
import { SectionContent } from '@/components/section-content';
import { UnitSearch } from '@/features/unit/components/unit-search';
import { convertUnitDtoToUnit } from '@/features/unit/util/convert';
import { getUnits } from '@/features/unit/api/unit';
import { useSearchPagination } from '@/hooks/use-search-pagination';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/_inventory_layout/units/')({
  component: () => <UnitPage />
});

function UnitPage() {
  const { q, setQ, data, isLoading, paginationDetail } = useSearchPagination({ getEntity: getUnits, key: ['units'] });
  return (
    <>
      <SectionHeader>
        <TypographyH1>
          Unit and Stock
        </TypographyH1>
      </SectionHeader>
      <SectionContent className='flex flex-col h-full'>
        <div className='flex justify-between'>
          <UnitSearch 
            className='w-[400px]' 
            value={q} 
            onChange={setQ}
          />
          <div className='flex flex-row-reverse gap-4'>
            <NewUnitButton />
            <RestockButton />
          </div>
        </div>
        <div className='mt-4'>
          <UnitTable 
            isLoading={isLoading} 
            units={data?.content.map((u) => convertUnitDtoToUnit(u)) || []}  
            paginationDetail={paginationDetail}
          />
        </div>
      </SectionContent>
    </>
  );
}