import { PageLoading } from '@/components/page-loading';
import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { NewVehicleButton } from '@/features/vehicles/components/new-vehicle.btn';
import { VehicleSearch } from '@/features/vehicles/components/vehicle-search';
import { VehicleTable } from '@/features/vehicles/components/vehicle-table';
import { useVehicleSearch } from '@/features/vehicles/hooks/vehicle-search';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/vehicles/')({
  component: () => <VehiclePage />
});

function VehiclePage() {
  const { q, setQ, data, isLoading } = useVehicleSearch({ enabled: true });
  console.log("HEY", data);
  return (
    <Section className='pt-4'>
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
          <VehicleTable data={data} className='mt-4' />
        } 
      </SectionContent>
    </Section>
  );
}