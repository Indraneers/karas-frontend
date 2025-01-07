import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getUnitById, updateUnit } from '@/features/unit/api/unit';
import { UnitForm } from '@/features/unit/components/unit-form';
import { UnitRequestDto } from '@/features/unit/types/unit.dto';
import { convertUnitDtoToUnitForm } from '@/features/unit/util/convert';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/units/edit/$unitId')({
  component: () => <UpdateUnitPage />
});

function UpdateUnitPage() {
  const { unitId } = Route.useParams();
  const queryClient = useQueryClient();

  const [unitQuery] = useQueries({
    queries: [
      {
        queryKey: ['unit-' + unitId],
        queryFn: async () => await getUnitById(unitId)
      }
    ]
  });
  
  const mutation = useMutation({
    mutationFn: async (unitDto: UnitRequestDto) => await updateUnit(unitId, unitDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['units']
      });
      queryClient.invalidateQueries({
        queryKey: ['unit-' + unitId]
      });
    }
  });

  if (unitQuery.isError) {
    return 'error';
  }

  if (unitQuery.isLoading) {
    return 'loading';
  }

  if (!unitQuery.data) {
    return 'empty';
  }

  return (
    <Section className='pt-4'>
      <SectionHeader>
        <TypographyH1>
          Update Unit
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        <UnitForm data={convertUnitDtoToUnitForm(unitQuery.data)} handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}