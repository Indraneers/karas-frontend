import { z } from "zod";
import { AppConfig } from "../types/app-config";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import { FormGroup } from "@/components/form-group";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputTags } from "@/components/input-tags";
import { toast } from "sonner";

const formSchema = z.object({
  id: z.number(),
  logo: z.string(),
  branchNameEn: z.string({ message: 'English branch name is required' }),
  branchNameKh: z.string({ message: 'Khmer branch name is required' }),
  addressEn: z.string({ message: 'English address is required' }),
  addressKh: z.string({ message: 'Khmer address is required' }),
  phoneNumbers: z.array(z.string()),
  file: z.any()
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only SVG and PNG files are allowed"
    })
    .optional()
});

interface AppConfigFormProps {
  handleSubmit: ({ appConfig, file } : { appConfig: AppConfig, file: File }) => void;
  data: AppConfig
}

export function AppConfigForm({ data, handleSubmit }: AppConfigFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { file, ...appConfig } = values;
    handleSubmit({ appConfig, file });
    toast("Invoice config changed!");
  }

  useEffect(() => {
    form.reset(data);
  }, [form, data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormGroup title="Invoice Information">
          <FormField
            control={form.control}
            name="branchNameEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>English Branch Name</FormLabel>
                <FormControl>
                  <Input className="w-[500px]" placeholder="Ex: KK Lube Express" {...field} />
                </FormControl>
                <FormDescription>
                  Set the English Branch Name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="branchNameKh"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>Khmer Branch Name</FormLabel>
                <FormControl>
                  <Input className="w-[500px]" placeholder="Ex:" {...field} />
                </FormControl>
                <FormDescription>
                  Set the Khmer Branch Name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressEn"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>English Address</FormLabel>
                <FormControl>
                  <Input className="w-[800px]" placeholder="Ex:" {...field} />
                </FormControl>
                <FormDescription>
                  Set the English Address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressKh"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>Khmer Address</FormLabel>
                <FormControl>
                  <Input className="w-[800px]" placeholder="Ex:" {...field} />
                </FormControl>
                <FormDescription>
                  Set the Khmer Address
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
                <FormLabel>Set Invoice Logo</FormLabel>
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
                <FormDescription>
                  Set the image for the invoice logo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="phoneNumbers"
             
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="mt-6">
                <FormLabel>Set Phone Numbers</FormLabel>
                <InputTags
                  {...fieldProps}
                  className="border-foreground w-[500px]"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter phone number"
                />
                <FormDescription>
                  Set phone number for invoice
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