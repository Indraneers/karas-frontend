import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Skeleton } from '@/components/ui/skeleton';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getSubcategoryById, updateSubcategory } from '@/features/subcategory/api/subcategory';
import { SubcategoryForm } from '@/features/subcategory/components/subcategory-form';
import { SubcategoryRequestDto } from '@/features/subcategory/types/subcategory.dto';
import { convertSCResponseDtoToSCRequestDto } from '@/features/subcategory/utils/convert';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/subcategories/edit/$subcategoryId')({
  component: () => <EditSubcategoryPage />
});

function EditSubcategoryPage() {
  const { subcategoryId } = Route.useParams();
  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['subcategory-' + subcategoryId],
    queryFn: async () => await getSubcategoryById(subcategoryId)
  });

  const mutation = useMutation({
    mutationFn: async ({ scDto, file }: { scDto: SubcategoryRequestDto, file?: File }) => await updateSubcategory(subcategoryId, scDto, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subcategories']
      });
      queryClient.invalidateQueries({
        queryKey: ['subcategory-' + subcategoryId]
      });
    }
  });

  if (isError) {
    return 'error';
  }

  return (
    <Section>
      <SectionHeader>
        <TypographyH1>Edit Subcategory</TypographyH1>
      </SectionHeader>
      <SectionContent>
        {
          (!data || isLoading) &&
          <div>
            <Skeleton className='w-[800px] h-8' />
            <Skeleton className='mt-8 w-[300px] h-8' />
            <Skeleton className='mt-8 w-[250px] h-8' />
            <Skeleton className='mt-8 w-[300px] h-8' />
          </div>
        }
        {
          !isLoading && data &&
          <SubcategoryForm data={convertSCResponseDtoToSCRequestDto(data)} handleSubmit={mutation.mutate} />
        }
      </SectionContent>
    </Section>
  );
}