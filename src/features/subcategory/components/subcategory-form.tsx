 
import { FormGroup } from "@/components/form-group";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from "react";
import { FormSearch } from "@/components/form-search";
import { useCategorySearch } from "@/features/category/hooks/category-search";
import { SubcategoryRequestDto } from "../types/subcategory.dto";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/file";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  id: z.string(),
  categoryId: z.string({ message: 'Category is required' }).min(1, 'Category is required'),
  name: z.string({ message: 'Name is required' }).min(2).max(50),
  file: z.any()
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only SVG and PNG files are allowed"
    }).optional()
});

const defaultData: SubcategoryRequestDto = {
  id: '',
  name: '',
  categoryId: ''
};

interface SubcategoryFormProps {
  handleSubmit: ({ scDto, file } : { scDto: SubcategoryRequestDto, file?: File}) => void;
  data?: SubcategoryRequestDto | undefined;
}

export function SubcategoryForm({ data = defaultData, handleSubmit = console.log } : SubcategoryFormProps) {
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      handleSubmit({ scDto: values, file: values.file });
      form.reset();
      navigate({ to: '/inventory/subcategories' });
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
                <FormLabel>Subcategory Name</FormLabel>
                <FormControl>
                  <Input className="w-[500px]" placeholder="Ex: Diesel Engine Oil" {...field} />
                </FormControl>
                <FormDescription>
                Set the subcategory name. Min. 3 Max. 50
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="file"
            render={({ field: { onChange, ...fieldProps } }) => (
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

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (  
              <FormItem className="mt-6">
                <FormLabel>Select Category</FormLabel>
                <FormSearch
                  autoQuery
                  value={field.value}
                  onChange={field.onChange}
                  useSearch={useCategorySearch}
                  placeholder='Search for categories'
                  entityName='category'
                  useId
                />
                <FormDescription>
                  Choose a Category
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