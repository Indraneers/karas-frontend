import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Skeleton } from '@/components/ui/skeleton';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getCategoryById, updateCategory } from '@/features/category/api/category';
import { CategoryForm } from '@/features/category/components/category-form';
import { CategoryDto } from '@/features/category/types/category.dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/categories/edit/$categoryId')({
  component: () => <UpdateCategoryPage />
});

function UpdateCategoryPage() {
  const { categoryId } = Route.useParams();
  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['category-' + categoryId],
    queryFn: async () => await getCategoryById(categoryId)
  });
  
  const mutation = useMutation({
    mutationFn: async ({ categoryDto, file } : { categoryDto: CategoryDto, file?: File }) =>
      await updateCategory(categoryId, categoryDto, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories']
      });

      queryClient.invalidateQueries({
        queryKey: ['category-' + categoryId]
      });
    }
  });

  if (isError) {
    return 'error';
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
        {
          (!data || isLoading) &&
          <div>
            <Skeleton className='w-[500px] h-8' />
            <Skeleton className='mt-8 w-[300px] h-8' />
            <Skeleton className='mt-8 w-[200px] h-8' />
          </div>
        }
        {
          !isLoading &&
          <CategoryForm data={data} handleSubmit={mutation.mutate} />
        }
      </SectionContent>
    </Section>
  );
}