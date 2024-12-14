import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getCategories } from '@/features/category/api/category';
import { createProduct } from '@/features/product/api/product';
import { ProductForm } from '@/features/product/components/product-form';
import { ProductDto } from '@/features/product/types/product.dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/products/create')({
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
    <Section>
      <SectionHeader>
        <TypographyH1>
        Update New Product
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        <ProductForm categories={data} handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}