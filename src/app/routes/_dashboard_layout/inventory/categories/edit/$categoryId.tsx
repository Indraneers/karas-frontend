import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getCategoryById, updateCategory } from '@/features/category/api/category';
import { CategoryForm } from '@/features/category/components/category-form';
import { CategoryDto } from '@/features/category/dto/category.dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/inventory/categories/edit/$categoryId')({
  component: () => <UpdateCategoryPage />
});

function UpdateCategoryPage() {
  const { categoryId } = Route.useParams();
  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['category-', categoryId],
    queryFn: async () => await getCategoryById(categoryId)
  });
  
  const mutation = useMutation({
    mutationFn: async (categoryDto: CategoryDto) => await updateCategory(categoryId, categoryDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
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
        <TypographyH1>Edit Category</TypographyH1>
      </SectionHeader>
      <SectionContent>
        <CategoryForm data={data} handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}