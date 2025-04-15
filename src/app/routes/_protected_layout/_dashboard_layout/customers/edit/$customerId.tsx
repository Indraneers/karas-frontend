import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Skeleton } from '@/components/ui/skeleton';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getCustomerById, updateCustomer } from '@/features/customer/api/customer';
import { CustomerForm } from '@/features/customer/components/customer-form';
import { CustomerDto } from '@/features/customer/types/customer.dto';
import { convertCustomerDtoToCustomer } from '@/features/customer/utils/customer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/customers/edit/$customerId')({
  component: () => <EditCustomerPage />
});

function EditCustomerPage() {
  const { customerId } = Route.useParams();

  const queryClient = useQueryClient();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['customer-' + customerId],
    queryFn: () => getCustomerById(customerId)
  });

  const mutation = useMutation({
    mutationFn: (customerDto: CustomerDto) => updateCustomer(customerId, customerDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['customers']
      });
      queryClient.invalidateQueries({
        queryKey: ['customer-' + customerId]
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
        <TypographyH1>
          Update Customer
        </TypographyH1>
      </SectionHeader>
      <SectionContent>
        {
          (!data || isLoading) &&
          <div>
            <Skeleton className='w-[200px] h-8' />
            <Skeleton className='mt-8 w-[200px] h-8' />
            <Skeleton className='mt-8 w-[500px] h-8' />
            <Skeleton className='mt-8 w-full h-16' />
          </div>
        }
        {
          !isLoading &&
          <CustomerForm data={convertCustomerDtoToCustomer(data)} handleSubmit={mutation.mutate} />
        }
      </SectionContent>
    </Section>
  );
}