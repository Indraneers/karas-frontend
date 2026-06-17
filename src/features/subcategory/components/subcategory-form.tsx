/* eslint-disable @typescript-eslint/no-unused-vars */
 
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
import { handleFormError } from "@/lib/form-error";
import { ColorPicker } from "@/components/color-picker";
import { ImageCropperFormField } from "@/components/ui/img-cropper";

const formSchema = z.object({
  id: z.string(),
  categoryId: z.string({ message: 'Category is required' }).min(1, 'Category is required'),
  name: z.string({ message: 'Name is required' }).min(2).max(50),
  file: z.any()
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only SVG and PNG files are allowed"
    }).optional(),
  color: z.string()
});

const defaultData: SubcategoryRequestDto = {
  id: '',
  name: '',
  categoryId: '',
  color: ''
};

interface SubcategoryFormProps {
  handleSubmit: ({ scDto, file } : { scDto: SubcategoryRequestDto, file?: File}) => Promise<unknown>;
  data?: SubcategoryRequestDto | undefined;
  /** When rendered inside a sheet, skip page navigation on submit. */
  isSheet?: boolean;
  /** Existing POS icon URL to preview when editing. */
  existingImg?: string;
  /** Disable the submit button while the mutation is in flight. */
  isSubmitting?: boolean;
}

export function SubcategoryForm({
  data = defaultData,
  handleSubmit,
  isSheet = false,
  existingImg,
  isSubmitting = false
} : SubcategoryFormProps) {
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { file, ...scDto } = values;
    try {
      await handleSubmit({ scDto, file });
      if (!isSheet) {
        form.reset();
        navigate({ to: '/inventory/subcategories' });
        router.invalidate();
      }
    }
    catch(error: unknown) {
      handleFormError(error, form);
    }
  }

  useEffect(() => {
    form.reset(data);
  }, [form, data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 pb-6">
        <FormGroup title="General Information">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory Name</FormLabel>
                <FormControl>
                  <Input className={isSheet ? "w-full" : "w-[800px]"} placeholder="Ex: Diesel Engine Oil" {...field} />
                </FormControl>
                <FormDescription>
                Set the subcategory name. Min. 3 Max. 50
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <ImageCropperFormField
            form={form}
            name="file"
            label="Set POS Icon"
            className="mt-4"
            initialPreviewUrl={existingImg}
          />
          <FormField
            control={form.control}
            name="color"
             
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="mt-4">
                <FormLabel>Set POS Color</FormLabel>
                <ColorPicker
                  {...fieldProps}
                  className="block"
                  background={value || ''}
                  setBackground={onChange}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (  
              <FormItem className="mt-4">
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
          disabled={isSubmitting}
          className={isSheet ? "w-full" : undefined}
        >
          {isSubmitting ? "Saving…" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}