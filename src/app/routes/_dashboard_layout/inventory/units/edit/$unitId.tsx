import { Header } from '@/components/header';
import { getProducts } from '@/features/product/api/product';
import { getUnitById, updateUnit } from '@/features/unit/api/unit';
import { UnitForm } from '@/features/unit/components/unit-form';
import { UnitDto } from '@/features/unit/dto/unit.dto';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/units/edit/$unitId')({
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
        queryKey: ['product-', unitId],
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
    <div className='py-12'>
      <Header className='text-2xl'>Update New Unit</Header>
      <div className='mt-4'>
        <UnitForm data={unitQuery.data} products={productQuery.data} handleSubmit={mutation.mutate} />
      </div>
    </div>
  );
}