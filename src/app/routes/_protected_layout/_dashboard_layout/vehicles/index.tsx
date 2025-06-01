import { PageLoading } from '@/components/page-loading';
import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getVehicles } from '@/features/vehicle/api/vehicle';
import { NewVehicleButton } from '@/features/vehicle/components/new-vehicle.btn';
import { VehicleTable } from '@/features/vehicle/components/vehicle-table';
import { VehicleSearch } from '@/features/vehicle/components/vehicle-search';
import { createFileRoute } from '@tanstack/react-router';
import { useSearchPagination } from '@/hooks/use-search-pagination';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/vehicles/')({
  component: () => <VehiclePage />
});

function VehiclePage() {
  const { q, setQ, data, isLoading, paginationDetail } = useSearchPagination({ getEntity: getVehicles, key: ['vehicles'] });
  return (
    <Section>
      <SectionHeader>
        <TypographyH1>
          Vehicles
        </TypographyH1>
        <Subtitle>
          Page for handling vehicle creation, deletion,
          and update.
        </Subtitle>
      </SectionHeader>
      <SectionContent>
        <div className='flex justify-between gap-8'>
          <VehicleSearch 
            className='w-[400px]'
            value={q}
            onChange={setQ}
          />
          <NewVehicleButton />
        </div>
        {
          (isLoading || !data) &&
          <PageLoading />
        }
        {
          !isLoading && data &&
          <VehicleTable paginationDetail={paginationDetail} data={data.content} className='mt-4' />
        } 
      </SectionContent>
    </Section>
  );
}