import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { createUnit } from '@/features/unit/api/unit';
import { UnitForm } from '@/features/unit/components/unit-form';
import { UnitRequestDto } from '@/features/unit/types/unit.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/units/create')({
  component: () => <CreateUnitPage />
});

function CreateUnitPage() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ unitDto, file }: { unitDto: UnitRequestDto, file?: File }) =>
      await createUnit(unitDto, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['units']
      });
    }
  });

  return (
    <Section>
      <SectionHeader>
        <TypographyH1>Create New Unit</TypographyH1>
      </SectionHeader>
      <SectionContent>
        <UnitForm handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}