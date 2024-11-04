import { Header } from '@/components/header';
import { getCategories } from '@/features/category/api/category';
import { createProduct } from '@/features/product/api/product';
import { ProductForm } from '@/features/product/components/product-form';
import { ProductDto } from '@/features/product/dto/product.dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/products/create')({
  component: () => <CreateProductPage />
});

function CreateProductPage() {
  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => getCategories()
  });

  const mutation = useMutation({
    mutationFn: async (productDto: ProductDto) => await createProduct(productDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products']
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
    <div className='py-12'>
      <Header className='text-2xl'>Create New Category</Header>
      <div className='mt-4'>
        <ProductForm categories={data} handleSubmit={mutation.mutate} />
      </div>
    </div>
  );
}