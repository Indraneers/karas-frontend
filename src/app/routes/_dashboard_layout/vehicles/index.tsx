import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { NewCustomerButton } from '@/features/customer/components/new-customer-btn';
import { VehicleTable } from '@/features/vehicles/components/vehicle-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/vehicles/')({
  component: () => <VehiclePage />
});

function VehiclePage() {
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
        <div className='flex justify-between'>
          <div></div>
          <NewCustomerButton />
        </div>
        <VehicleTable className='mt-4' />
      </SectionContent>
    </Section>
  );
}