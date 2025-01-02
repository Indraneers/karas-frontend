import { z } from "zod";
import { ProductDto } from "../types/product.dto";
import { Category } from "@/types/category";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { FormGroup } from "@/components/form-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  id: z.string(),
  name: z.string({ message: 'Name is required' }).min(2).max(50),
  categoryId: z.string({ message: 'Category is required' }),
  variable: z.boolean({ message: 'Variable is required' }),
  baseUnit: z.string()
}).refine(schema => {
  return !(schema.variable && !schema.baseUnit);
}, {
  message: "Base Unit is required if variable is true",
  path: ['baseUnit']
});

const defaultData: ProductDto = {
  id: '',
  name: '',
  categoryId: '',
  variable: false,
  baseUnit: ''
};

interface ProductFormProps {
  handleSubmit: (values: z.infer<typeof formSchema>) => void;
  data?: ProductDto | undefined;
  categories: Category[];
}

export function ProductForm({ data = defaultData, handleSubmit = console.log, categories }: ProductFormProps) {
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit(values);
    form.reset(data);
    navigate({ to: '/inventory/products' });
    router.invalidate();
  }

  useEffect(() => {
    form.reset(data);
  }, [form, data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormGroup title="General Information">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
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
                    <SelectTrigger className="w-[2re00px]">
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
        <FormGroup title="Stock Information">
          <div className="items-center gap-8 grid grid-cols-3 mt-4">
            <FormField
              control={form.control}
              name="variable"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between items-center shadow-sm p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <FormLabel>Variable Status</FormLabel>
                    <FormDescription>
                      Set if the product is variable (handling partial units)
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="baseUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Unit Name (Required if Variable Status is on)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 1L" {...field} />
                  </FormControl>
                  <FormDescription>
                    Set the most basic unit of the product
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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