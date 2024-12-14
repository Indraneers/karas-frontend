import { z } from "zod";
import { ProductDto } from "../types/product.dto";
import { Category } from "@/types/category";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { FormGroup } from "@/components/form-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string({ message: 'Name is required' }).min(2).max(50),
  categoryId: z.string({ message: 'Category is required' })
});

const defaultData: ProductDto = {
  id: '',
  name: '',
  categoryId: ''
};

interface ProductFormProps {
  handleSubmit: (values: z.infer<typeof formSchema>) => void;
  data?: ProductDto | undefined;
  categories: Category[];
}

export function ProductForm({ data = defaultData, handleSubmit = console.log, categories }: ProductFormProps) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit(values);
    form.reset(data);
    navigate({ to: '/inventory/products' });
  }

  useEffect(() => {
    form.reset(data);
  }, [form, data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormGroup title="General Information">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input className="w-[500px]" placeholder="Ex: Twister 40W-80" {...field} />
                </FormControl>
                <FormDescription>
                Set the product name. Min. 3 Max. 50
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    { categories.map((c) => (
                      <SelectItem value={c.id} key={c.id}>
                        {c.name}
                      </SelectItem>
                    ))
                    }
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the category that this product belongs to
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