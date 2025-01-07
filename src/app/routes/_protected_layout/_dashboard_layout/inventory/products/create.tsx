import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { createProduct } from '@/features/product/api/product';
import { ProductForm } from '@/features/product/components/product-form';
import { ProductRequestDto } from '@/features/product/types/product.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/products/create')({
  component: () => <CreateProductPage />
});

function CreateProductPage() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ productDto, file } : { productDto: ProductRequestDto, file?: File }) => await createProduct(productDto, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products']
      });
    }
  });

  return (
    <Section className='pt-4'>
      <SectionHeader>
        <TypographyH1>
        Update New Product
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        <ProductForm handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}