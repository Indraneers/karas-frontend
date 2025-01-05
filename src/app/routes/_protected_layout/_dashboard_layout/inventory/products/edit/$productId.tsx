import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getProductById, updateProduct } from '@/features/product/api/product';
import { ProductForm } from '@/features/product/components/product-form';
import { ProductRequestDto } from '@/features/product/types/product.dto';
import { convertProductDtoToProductForm } from '@/features/product/utils/convert';
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
    mutationFn: async (productDto: ProductRequestDto) => await updateProduct(productId, productDto),
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

  if (productQuery.isLoading) {
    return 'loading';
  }

  if (!productQuery.data) {
    return 'empty';
  }

  return (
    <Section className='pt-4'>
      <SectionHeader>
        <TypographyH1>
          Update New Product
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        <ProductForm data={convertProductDtoToProductForm(productQuery.data)} handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}