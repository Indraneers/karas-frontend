import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Skeleton } from '@/components/ui/skeleton';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getVehicleById, updateVehicle } from '@/features/vehicle/api/vehicle';
import { VehicleForm } from '@/features/vehicle/components/vehicle-form';
import { VehicleDto } from '@/features/vehicle/types/vehicle.dto';
import { convertVehicleDtoToVehicle } from '@/features/vehicle/utils/vehicle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/vehicles/edit/$vehicleId')({
  component: () => <EditVehiclePage />
});

function EditVehiclePage() {
  const { vehicleId } = Route.useParams();

  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: () => getVehicleById(vehicleId)
  });

  const mutation = useMutation({
    mutationFn: (VehicleDto: VehicleDto) => {
      return updateVehicle(vehicleId, VehicleDto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vehicles']
      });
      queryClient.invalidateQueries({
        queryKey: ['vehicle', vehicleId]
      });
    }
  });

  if (isError) {
    return 'error';
  }

  return (
    <Section className='py-4'>
      <SectionHeader>
        <TypographyH1>
          Update Vehicle
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        {
          (!data || isLoading) &&
          <div>
            <div className='gap-8 grid grid-cols-3 h-8'>
              <Skeleton className='w-[200px]' />
              <Skeleton className='w-[300px]' />
            </div>
            <Skeleton className='mt-8 w-[300px] h-8' />
            <Skeleton className='mt-8 w-[200px] h-8' />
            <div className='gap-8 grid grid-cols-3 mt-8 h-8'>
              <Skeleton className='w-[300px]' />
              <Skeleton className='w-[300px]' />
            </div>
            <Skeleton className='mt-8 h-16' />
          </div>
        }
        {
          !isLoading && data &&
          <VehicleForm data={convertVehicleDtoToVehicle(data)} handleSubmit={mutation.mutate} />
        }
      </SectionContent>
    </Section>
  );
}