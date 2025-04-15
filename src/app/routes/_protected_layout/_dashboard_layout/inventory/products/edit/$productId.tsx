import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Skeleton } from '@/components/ui/skeleton';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getProductById, updateProduct } from '@/features/product/api/product';
import { ProductForm } from '@/features/product/components/product-form';
import { ProductRequestDto } from '@/features/product/types/product.dto';
import { convertProductResponseDtoToProductRequestDto } from '@/features/product/utils/convert';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/products/edit/$productId')({
  component: () => <UpdateProductPage />
});

function UpdateProductPage() {
  const { productId } = Route.useParams();
  const queryClient = useQueryClient();

  const [productQuery] = useQueries({
    queries: [
      {
        queryKey: ['product-' + productId],
        queryFn: async () => await getProductById(productId)
      }
    ]
  });
  
  const mutation = useMutation({
    mutationFn: async ({ productDto, file } : { productDto: ProductRequestDto, file?: File }) => await updateProduct(productId, productDto, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products']
      });
      queryClient.invalidateQueries({
        queryKey: ['product-' + productId]
      });
    }
  });

  if (productQuery.isError) {
    return 'error';
  }

  if (!productQuery.data) {
    return 'empty';
  }

  return (
    <Section>
      <SectionHeader>
        <TypographyH1>
          Update New Product
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        {
          !productQuery.data &&
          <div>
            <Skeleton className='w-[300px] h-8' />
            <Skeleton className='mt-8 w-[200px] h-8' />
            <Skeleton className='mt-8 w-[300px] h-8' />
            <Skeleton className='mt-8 w-[300px] h-8' />
            <div className='gap-8 grid grid-cols-3 mt-8 h-20'>
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        }
        {
          (!productQuery.data || productQuery.isLoading) &&
          <div>
            <Skeleton className='w-[300px] h-8' />
            <Skeleton className='mt-8 w-[200px] h-8' />
            <Skeleton className='mt-8 w-[300px] h-8' />
            <Skeleton className='mt-8 w-[300px] h-8' />
            <div className='gap-8 grid grid-cols-3 mt-8 h-20'>
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        }
        {
          !productQuery.isLoading &&
          <ProductForm data={convertProductResponseDtoToProductRequestDto(productQuery.data)} handleSubmit={mutation.mutate} />
        }
      </SectionContent>
    </Section>
  );
}