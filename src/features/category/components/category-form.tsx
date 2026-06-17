import { FormGroup } from "@/components/form-group";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategoryDto } from "../types/category.dto";
import { useEffect } from "react";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/file";
import { ColorPicker } from "@/components/color-picker";
import { ImageCropperFormField } from "@/components/ui/img-cropper";

const formSchema = z.object({
  id: z.string(),
  name: z.string({ message: "Name is required" }).min(2).max(50),
  subcategoryCount: z.number(),
  file: z
    .any()
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only SVG and PNG files are allowed",
    })
    .optional(),
  img: z.string().optional(),
  color: z.string().optional(),
});

const defaultData: CategoryDto = {
  id: "",
  name: "",
  subcategoryCount: 0,
  img: "",
  color: "",
};

interface CategoryFormProps {
  handleSubmit: ({
    categoryDto,
    file,
  }: {
    categoryDto: CategoryDto;
    file?: File;
  }) => void;
  data?: CategoryDto | undefined;
  /** When rendered inside a sheet, skip page navigation on submit. */
  isSheet?: boolean;
  /** Existing POS icon URL to preview when editing. */
  existingImg?: string;
  /** Disable the submit button while the mutation is in flight. */
  isSubmitting?: boolean;
}

export function CategoryForm({
  data = defaultData,
  handleSubmit = console.log,
  isSheet = false,
  existingImg,
  isSubmitting = false,
}: CategoryFormProps) {
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { file, ...categoryDto } = values;
    handleSubmit({ categoryDto, file });
    if (!isSheet) {
      form.reset();
      navigate({ to: "/inventory/categories" });
      router.invalidate();
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
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    className={isSheet ? "w-full" : "w-[500px]"}
                    placeholder="Ex: Engine Oil"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Set the category name. Min. 3 Max. 50
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
                  background={value || ""}
                  setBackground={onChange}
                />
              </FormItem>
            )}
          />
        </FormGroup>
        <Button type="submit" disabled={isSubmitting} className={isSheet ? "w-full" : undefined}>
          {isSubmitting ? "Saving…" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
