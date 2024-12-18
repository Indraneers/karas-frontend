import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { createCategory } from '@/features/category/api/category';
import { CategoryForm } from '@/features/category/components/category-form';
import { CategoryDto } from '@/features/category/dto/category.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/categories/create')({
  component: () => <CreateCategoryPage />
});

function CreateCategoryPage() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (categoryDto: CategoryDto) => await createCategory(categoryDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      });
    }
  });

  return (
    <Section className='pt-4'>
      <SectionHeader>
        <TypographyH1>Edit Category</TypographyH1>
      </SectionHeader>
      <SectionContent>
        <CategoryForm handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>

  );
}