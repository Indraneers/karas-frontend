import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { createSubcategory } from '@/features/subcategory/api/subcategory';
import { SubcategoryForm } from '@/features/subcategory/components/subcategory-form';
import { SubcategoryRequestDto } from '@/features/subcategory/types/subcategory.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/subcategories/create')({
  component: () => <CreateSubcategoryPage />
});

function CreateSubcategoryPage() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ scDto, file }: { scDto: SubcategoryRequestDto, file?: File }) => await createSubcategory(scDto, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subcategories']
      });
    }
  });

  return (
    <Section>
      <SectionHeader>
        <TypographyH1>Create Subcategory</TypographyH1>
      </SectionHeader>
      <SectionContent>
        <SubcategoryForm handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}