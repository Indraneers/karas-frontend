import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { createVehicle } from '@/features/vehicles/api/vehicle';
import { VehicleForm } from '@/features/vehicles/components/vehicle-form';
import { VehicleDto } from '@/features/vehicles/dto/vehicle.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/vehicles/create')({
  component: () => <CreateVehiclePage />
});

function CreateVehiclePage() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (vehicleDto: VehicleDto) => createVehicle(vehicleDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vehicles']
      });
    }
  });

  return (
    <Section className='py-4'>
      <SectionHeader>
        <TypographyH1>
          Create New Vehicle
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        <VehicleForm handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}