import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { createCustomer } from '@/features/customer/api/customer';
import { CustomerForm } from '@/features/customer/components/customer-form';
import { CustomerDto } from '@/features/customer/types/customer.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/customers/create')({
  component: () => <CreateCustomerPage />
});

function CreateCustomerPage() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (customerDto: CustomerDto) => createCustomer(customerDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['customers']
      });
    }
  });

  return (
    <Section className='pt-4'>
      <SectionHeader>
        <TypographyH1>
          Create New Customer
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        <CustomerForm handleSubmit={mutation.mutate} />
      </SectionContent>
    </Section>
  );
}