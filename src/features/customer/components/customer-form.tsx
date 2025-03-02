import { z } from 'zod';
import { CustomerDto } from '../types/customer.dto';
import { useNavigate } from '@tanstack/react-router';
import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormGroup } from '@/components/form-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  id: z.string(),
  name: z.string({ message: 'Name is required' }).min(2).max(50),
  contact: z.string().max(15),
  address: z.string().max(150),
  note: z.string().max(200)
});

const defaultData: CustomerDto = {
  id: '',
  name: '',
  contact: '',
  address: '',
  note: ''
};

interface CustomerFormProps {
  handleSubmit: (values: CustomerDto) => void;
  data?: CustomerDto | undefined;
  isPopover?: boolean;
}

export function CustomerForm({ data = defaultData, handleSubmit = console.log, isPopover }: CustomerFormProps) {
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit(values);
    form.reset();
    if (!isPopover) {
      navigate({ to: '/customers' });
      router.invalidate();
    }
  }

  useEffect(() => {
    form.reset(data);
  }, [form, data]);

  if (isPopover) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormGroup title="General Information">
            <div className='items-center gap-4 grid grid-cols-2'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: John Smith" {...field} />
                    </FormControl>
                    <FormDescription>
                  Set the Customer name. Min. 3 Max. 50
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 012 345 567" {...field} />
                    </FormControl>
                    <FormDescription>
                  Set the Phone Number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
  
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className='mt-4'>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input className="w-[500px]" placeholder="Ex: 012 345 567" {...field} />
                  </FormControl>
                  <FormDescription>
                  Set the Customer Address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className='mt-4'>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                  Set the Customer Note
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  
          </FormGroup>
          <Button
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    );
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormGroup title="General Information">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input className="w-[200px]" placeholder="Ex: John Smith" {...field} />
                </FormControl>
                <FormDescription>
                Set the Customer name. Min. 3 Max. 50
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input className="w-[200px]" placeholder="Ex: 012 345 567" {...field} />
                </FormControl>
                <FormDescription>
                Set the Phone Number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input className="w-[500px]" placeholder="Ex: 012 345 567" {...field} />
                </FormControl>
                <FormDescription>
                Set the Customer Address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                Set the Customer Note
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        </FormGroup>
        <Button
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}