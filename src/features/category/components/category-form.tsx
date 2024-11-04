import { FormGroup } from "@/components/form-group";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string({ message: 'Name is required ' }).min(2).max(50)
});

interface CategoryFormProps {
  handleSubmit: (values: z.infer<typeof formSchema>) => void;
}

export function CategoryForm({ handleSubmit = console.log } : CategoryFormProps) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit(values);
    navigate({ to: '/categories' });
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
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input className="w-[500px]" placeholder="Ex: Engine Oil" {...field} />
                </FormControl>
                <FormDescription>
                Set the category name. Min. 3 Max. 50
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>
        <Button 
          className="bg-green-500 hover:bg-green-600 text-white"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}