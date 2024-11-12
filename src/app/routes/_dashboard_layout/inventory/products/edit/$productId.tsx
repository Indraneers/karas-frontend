import { Header } from '@/components/header';
import { getCategories } from '@/features/category/api/category';
import { getProductById, updateProduct } from '@/features/product/api/product';
import { ProductForm } from '@/features/product/components/product-form';
import { ProductDto } from '@/features/product/dto/product.dto';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/products/edit/$productId')({
  component: () => <UpdateProductPage />
});

function UpdateProductPage() {
  const { productId } = Route.useParams();
  const queryClient = useQueryClient();

  const [categoryQuery, productQuery] = useQueries({
    queries: [
      {
        queryKey: ['categories'],
        queryFn: async () => getCategories()
      },
      {
        queryKey: ['product-', productId],
        queryFn: async () => await getProductById(productId)
      }
    ]
  });
  
  const mutation = useMutation({
    mutationFn: async (productDto: ProductDto) => await updateProduct(productId, productDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products']
      });
    }
  });

  if (productQuery.isError || categoryQuery.isError) {
    return 'error';
  }

  if (productQuery.isLoading || categoryQuery.isLoading) {
    return 'loading';
  }

  if (!productQuery.data || !categoryQuery.data) {
    return 'empty';
  }

  return (
    <div className='py-12'>
      <Header className='text-2xl'>Update New Category</Header>
      <div className='mt-4'>
        <ProductForm data={productQuery.data} categories={categoryQuery.data} handleSubmit={mutation.mutate} />
      </div>
    </div>
  );
}