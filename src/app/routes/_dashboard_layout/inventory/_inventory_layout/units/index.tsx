import { createFileRoute } from '@tanstack/react-router';
import { UnitTable } from '@/features/unit/components/unit-table';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { NewUnitButton } from '@/features/unit/components/new-unit-button';
import { RestockButton } from '@/features/unit/components/restock-button';
import { SectionHeader } from '@/components/section-header';
import { SectionContent } from '@/components/section-content';

export const Route = createFileRoute('/_dashboard_layout/inventory/_inventory_layout/units/')({
  component: () => <UnitPage />
});

function UnitPage() {
  return (
    <>
      <SectionHeader className='grid grid-cols-[1fr,2fr]'>
        <TypographyH1>
          Unit and Stock
        </TypographyH1>
        <div className='gap-4 grid grid-cols-[1fr,auto]'>
          {/* <UnitSearch /> */}
          <div className='flex flex-row-reverse gap-4'>
            <NewUnitButton />
            <RestockButton />
          </div>
        </div>
      </SectionHeader>
      <SectionContent className='h-full'>
        <div className='relative h-full'>
          <UnitTable className='absolute inset-0 h-full' />
        </div>
      </SectionContent>
    </>
  );
}