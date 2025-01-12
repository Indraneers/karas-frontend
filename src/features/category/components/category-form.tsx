import { FormGroup } from "@/components/form-group";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CategoryDto } from "../types/category.dto";
import { useEffect } from "react";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/file";

const formSchema = z.object({
  id: z.string(),
  name: z.string({ message: 'Name is required' }).min(2).max(50),
  subcategoryCount: z.number(),
  file: z.any()
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only SVG and PNG files are allowed"
    }).optional(),
  img: z.string().optional()
});

const defaultData: CategoryDto = {
  id: '',
  name: '',
  subcategoryCount: 0,
  img: ''
};

interface CategoryFormProps {
  handleSubmit: ({ categoryDto, file } : {categoryDto: CategoryDto, file?: File}) => void;
  data?: CategoryDto | undefined;
}

export function CategoryForm({ data = defaultData, handleSubmit = console.log } : CategoryFormProps) {
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { file, ...categoryDto } = values;
    handleSubmit({ categoryDto, file });
    form.reset();
    navigate({ to: '/inventory/categories' });
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
                  <Input className="w-[500px]" placeholder="Ex: Engine Oil" {...field} />
                </FormControl>
                <FormDescription>
                Set the category name. Min. 3 Max. 50
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
        <Button 
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}