import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getVehicleById, updateVehicle } from '@/features/vehicles/api/vehicle';
import { VehicleForm } from '@/features/vehicles/components/vehicle-form';
import { VehicleDto } from '@/features/vehicles/dto/vehicle.dto';
import { convertVehicleDtoToVehicle } from '@/features/vehicles/utils/vehicle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/vehicles/edit/$vehicleId')({
  component: () => <EditVehiclePage />
});

function EditVehiclePage() {
  const { vehicleId } = Route.useParams();

  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['vehicle-', vehicleId],
    queryFn: () => getVehicleById(vehicleId)
  });

  const mutation = useMutation({
    mutationFn: (VehicleDto: VehicleDto) => updateVehicle(vehicleId, VehicleDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vehicles']
      });
      queryClient.invalidateQueries({
        queryKey: ['vehicle-' + vehicleId]
      });
    }
  });

  if (isError) {
    return 'error';
  }

  if (isLoading) {
    return 'loading';
  }

  if (!data) {
    return 'empty';
  }

  return (
    <Section className='py-4'>
      <SectionHeader>
        <TypographyH1>
          Update Vehicle
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        <VehicleForm data={convertVehicleDtoToVehicle(data)} handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}