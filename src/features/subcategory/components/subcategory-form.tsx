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
import { SubcategoryFormType } from "../types/subcategory-form";
import { convertSCFormToSCDto } from "../utils/convert";
import { SubcategoryRequestDto } from "../types/subcategory.dto";

const formSchema = z.object({
  id: z.string(),
  category: z.object({
    id: z.string(),
    name: z.string(),
    subcategoryCount: z.number()
  }),
  name: z.string({ message: 'Name is required' }).min(2).max(50)
});

const defaultData: SubcategoryFormType = {
  id: '',
  name: '',
  category: {
    id: '',
    name: '',
    subcategoryCount: 0
  }
};

interface SubcategoryFormProps {
  handleSubmit: (values: SubcategoryRequestDto) => void;
  data?: SubcategoryFormType | undefined;
}

export function SubcategoryForm({ data = defaultData, handleSubmit = console.log } : SubcategoryFormProps) {
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const subcategoryDto = convertSCFormToSCDto(values);
    handleSubmit(subcategoryDto);
    form.reset();
    navigate({ to: '/inventory/subcategories' });
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
                <FormLabel>Category Name</FormLabel>
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
          <div className='mt-8'>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (  
                <FormItem>
                  <FormLabel>Select Category</FormLabel>
                  <FormSearch
                    autoQuery
                    value={field.value}
                    onChange={field.onChange}
                    useSearch={useCategorySearch}
                    placeholder='Search for categories'
                    entityName='category'
                  />
                  <FormDescription>
                  Choose a Category
                  </FormDescription>
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