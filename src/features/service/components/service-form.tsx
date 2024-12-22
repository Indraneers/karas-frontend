import { z } from "zod";
import { ServiceDto } from "../types/service.dto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { convertServiceFormToServiceDto } from "../utils/service";
import { useEffect } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormGroup } from "@/components/form-group";
import { Input } from "@/components/ui/input";
import { PrefixedCurrencyInput } from "@/components/prefixed-currency-input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export interface ServiceForm {
  id?: string;
  name: string;
  price: string;
  active: boolean;
}

const formSchema = z.object({
  id: z.string(),
  name: z.string({ message: 'Name is required' }).min(2).max(75),
  price: z.string(),
  active: z.boolean()
});

const defaultData: ServiceForm = {
  id: '',
  name: '',
  price: '',
  active: true
};

interface ServiceFormProps {
  handleSubmit: (serviceDto: ServiceDto) => void;
  data?: ServiceForm | undefined;
}

export function ServiceForm({ data = defaultData, handleSubmit }: ServiceFormProps) {
  const router = useRouter();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.id = '';
    const serviceDto = convertServiceFormToServiceDto(values);
    handleSubmit(serviceDto);  
    form.reset();
    navigate({ to: '/services', replace: true });
    router.invalidate();
  }

  useEffect(() => {
    form.reset(data);
  }, [data, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormGroup title="General Information">
          <div className="gap-4 grid grid-cols-3">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Oil Change" {...field} />
                  </FormControl>
                  <FormDescription>
                  Set the Service name. Min. 3 Max. 75
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormGroup>
        <FormGroup title="Stock Information (Price)">
                        
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Price ($)</FormLabel>
                <FormControl>
                  <PrefixedCurrencyInput
                    className="w-24 h-9"
                    defaultValue={field.value}
                    disableGroupSeparators
                    onValueChange={(value) => {
                      field.onChange(value); 
                    }}  
                  />
                </FormControl>
                <FormDescription>
                    Set the service price in dollar
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="items-center grid grid-cols-3 mt-4">
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between items-center shadow-sm p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <FormLabel>Status</FormLabel>
                    <FormDescription>
                      Set the visibility status of the service
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