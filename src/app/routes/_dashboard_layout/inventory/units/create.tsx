import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getProducts } from '@/features/product/api/product';
import { createUnit } from '@/features/unit/api/unit';
import { UnitForm } from '@/features/unit/components/unit-form';
import { UnitDto } from '@/features/unit/types/unit.dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/units/create')({
  component: () => <CreateUnitPage />
});

function CreateUnitPage() {
  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => getProducts()
  });

  const mutation = useMutation({
    mutationFn: async (unitDto: UnitDto) => await createUnit(unitDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['units']
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
    <Section>
      <SectionHeader>
        <TypographyH1>Create Unit</TypographyH1>
      </SectionHeader>
      <SectionContent>
        <UnitForm products={data} handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}