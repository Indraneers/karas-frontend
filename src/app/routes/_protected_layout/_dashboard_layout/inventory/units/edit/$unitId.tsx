import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getProducts } from '@/features/product/api/product';
import { getUnitById, updateUnit } from '@/features/unit/api/unit';
import { UnitForm } from '@/features/unit/components/unit-form';
import { UnitDto } from '@/features/unit/types/unit.dto';
import { convertUnitDtoToUnitForm } from '@/features/unit/util/convert';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/units/edit/$unitId')({
  component: () => <UpdateUnitPage />
});

function UpdateUnitPage() {
  const { unitId } = Route.useParams();
  const queryClient = useQueryClient();

  const [productQuery, unitQuery] = useQueries({
    queries: [
      {
        queryKey: ['categories'],
        queryFn: async () => getProducts()
      },
      {
        queryKey: ['unit-' + unitId],
        queryFn: async () => await getUnitById(unitId)
      }
    ]
  });
  
  const mutation = useMutation({
    mutationFn: async (unitDto: UnitDto) => await updateUnit(unitId, unitDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['units']
      });
      queryClient.invalidateQueries({
        queryKey: ['unit-' + unitId]
      });
    }
  });

  if (productQuery.isError || unitQuery.isError) {
    return 'error';
  }

  if (productQuery.isLoading || unitQuery.isLoading) {
    return 'loading';
  }

  if (!productQuery.data || !unitQuery.data) {
    return 'empty';
  }

  return (
    <Section className='pt-4'>
      <SectionHeader>
        <TypographyH1>
          Update New Unit
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        <UnitForm data={convertUnitDtoToUnitForm(unitQuery.data)} products={productQuery.data} handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}