import { Header } from '@/components/header';
import { getCategoryById, updateCategory } from '@/features/category/api/category';
import { CategoryForm } from '@/features/category/components/category-form';
import { CategoryDto } from '@/features/category/dto/category.dto';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/categories/edit/$categoryId')({
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
    <div className='py-12'>
      <Header className='text-2xl'>Update New Category</Header>
      <div className='mt-4'>
        <CategoryForm data={data} handleSubmit={mutation.mutate} />
      </div>
    </div>
  );
}