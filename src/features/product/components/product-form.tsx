import { z } from "zod";
import { ProductRequestDto } from "../types/product.dto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { FormGroup } from "@/components/form-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { FormSearch } from "@/components/form-search";
import { useSubcategorySearch } from "@/features/subcategory/hooks/subcategory-search";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/file";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  id: z.string(),
  name: z.string({ message: 'Name is required' }).min(2).max(150),
  subcategoryId: z.string({ message: 'Subcategory is requiqred' }).min(1, 'Subcategory is requiqred'),
  unitCount: z.number(),
  variable: z.boolean({ message: 'Variable is required' }),
  baseUnit: z.string(),
  file: z.any()
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only SVG and PNG files are allowed"
    })
    .optional()
}).refine(schema => {
  return !(schema.variable && !schema.baseUnit);
}, {
  message: "Base Unit is required if variable is true",
  path: ['baseUnit']
});

const defaultData: ProductRequestDto = {
  id: '',
  name: '',
  subcategoryId: '',
  unitCount: 0,
  variable: false,
  baseUnit: ''
};

interface ProductFormProps {
  handleSubmit: ({ productDto, file } : { productDto: ProductRequestDto, file?: File }) => void;
  data?: ProductRequestDto | undefined;
}

export function ProductForm({ data = defaultData, handleSubmit = console.log }: ProductFormProps) {
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  console.log(form.formState.errors, form.getValues());

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      handleSubmit({ productDto: values, file: values.file });
      form.reset();
      navigate({ to: '/inventory/products' });
      router.invalidate();
    }
    catch(error: unknown) {
      if (axios.isAxiosError(error))  {
        toast(error.message);
      }
    }
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
                Set the product name. Min. 3 Max. 150
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subcategoryId"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Select Subcategory</FormLabel>
                <FormSearch 
                  autoQuery
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Search for Subcategories"
                  entityName="subcategory"
                  useSearch={useSubcategorySearch}
                  useId
                />
                <FormDescription>
                  Select the subcategory that this product belongs to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="file"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="mt-6">
                <FormLabel>Set POS Icon</FormLabel>
                <Input 
                  {...fieldProps}
                  id="picture" 
                  type="file"
                  className="w-[300px] cursor-pointer"
                  accept="image/*"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
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
                    <Input placeholder="Ex: L" {...field} />
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