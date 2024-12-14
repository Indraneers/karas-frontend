import { createFileRoute } from '@tanstack/react-router';
import { UnitTable } from '@/features/unit/components/unit-table';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { NewUnitButton } from '@/features/unit/components/new-unit-button';
import { RestockButton } from '@/features/unit/components/restock-button';
import { SectionHeader } from '@/components/section-header';
import { SectionContent } from '@/components/section-content';
import { UnitSearch } from '@/features/unit/components/unit-search';

export const Route = createFileRoute('/_dashboard_layout/inventory/_inventory_layout/units/')({
  component: () => <UnitPage />
});

function UnitPage() {
  return (
    <>
      <SectionHeader className='mt-2'>
        <TypographyH1>
          Unit and Stock
        </TypographyH1>
        <span className='text-muted-foreground text-sm'>
          Page for handling category creation, deletion,
          and update.
        </span>
      </SectionHeader>
      <SectionContent className='flex flex-col pt-2 h-full'>
        <div className='flex justify-between'>
          <UnitSearch className='w-[400px]' value='' />
          <div className='flex flex-row-reverse gap-4'>
            <NewUnitButton />
            <RestockButton />
          </div>
        </div>
        <div className='relative flex-grow mt-4 h-full'>
          <UnitTable className='absolute inset-0 h-full' />
        </div>
      </SectionContent>
    </>
  );
}