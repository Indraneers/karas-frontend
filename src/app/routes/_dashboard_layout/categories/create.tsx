import { Header } from '@/components/header';
import { createCategory } from '@/features/category/api/category';
import { CategoryForm } from '@/features/category/components/category-form';
import { CategoryDto } from '@/features/category/dto/category.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/categories/create')({
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
    <div className='py-12'>
      <Header className='text-2xl'>Create New Category</Header>
      <div className='mt-4'>
        <CategoryForm handleSubmit={mutation.mutate} />
      </div>
    </div>
  );
}