import { z } from "zod";
import { VehicleDto } from "../dto/vehicle.dto";
import { useRouter } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormGroup } from "@/components/form-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CustomerSearch } from "@/features/customer/components/customer-search";

const formSchema = z.object({
  id: z.string(),
  plateNumber: z.string({ message: 'Plate Number is required' }).min(3).max(75),
  makeAndModel: z.string({ message: 'Make and Model are required' }).min(3).max(75),
  customer: z.object({
    id: z.string(),
    name: z.string()
  }),
  mileage: z.coerce.number().int(),
  vinNo: z.string(),
  engineNo: z.string(),
  note: z.string().min(2).max(75)
});

const defaultData: VehicleDto = {
  id: '',
  plateNumber: '',
  makeAndModel: '',
  customer: {
    id: '',
    name: ''
  },
  mileage: 0,
  vinNo: '',
  engineNo: '',
  note: ''
};

interface VehicleFormProps {
  handleSubmit: (vehicleDto: VehicleDto) => void;
  data?: VehicleDto | undefined;
  isPopover?: boolean;
}

export function VehicleForm({ data = defaultData, handleSubmit, isPopover = false }: VehicleFormProps) {
  const router = useRouter();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });
  
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.id = '';
    handleSubmit(values);  
    form.reset();
    if (!isPopover) {
      navigate({ to: '/vehicles', replace: true });
      router.invalidate();
    }
  }
  
  useEffect(() => {
    form.reset(data);
  }, [data, form]);

  if (isPopover) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormGroup title="General Information">
            <div className="gap-4 grid grid-cols-[1fr,2fr]">
  
              <FormField
                control={form.control}
                name="plateNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plate Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 7XLF906" {...field} />
                    </FormControl>
                    <FormDescription>
                  Set the Plate Number. Min. 3 Max. 75
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="makeAndModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Make and Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Toyota Prius 2024" {...field} />
                    </FormControl>
                    <FormDescription>
                  Set the Make and Model. Min. 3 Max. 75
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
  
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Customer</FormLabel>
                  <FormControl>
                    <CustomerSearch 
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                   Search and Select for Customer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  
          </FormGroup>  
          <FormGroup title="Vehicle Detail">
  
            <FormField
              control={form.control}
              name="mileage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mileage</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 60000 miles" {...field} />
                  </FormControl>
                  <FormDescription>
                    Set Mileage
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <div className="gap-4 grid grid-cols-2 mt-4">
              <FormField
                control={form.control}
                name="vinNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vin N.O</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 2HGFG21588H705472" {...field} />
                    </FormControl>
                    <FormDescription>
                  Set Vin Number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="engineNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engine N.O</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 2HGFG21588H705472" {...field} />
                    </FormControl>
                    <FormDescription>
                      Set Engine Number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
  
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className='mt-4'>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                  Set the Vehicle Note
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormGroup title="General Information">
          <div className="grid grid-cols-3">

            <FormField
              control={form.control}
              name="plateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plate Number</FormLabel>
                  <FormControl>
                    <Input className="w-[200px]" placeholder="Ex: 7XLF906" {...field} />
                  </FormControl>
                  <FormDescription>
                Set the Plate Number. Min. 3 Max. 75
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="makeAndModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Make and Model</FormLabel>
                  <FormControl>
                    <Input className="w-[300px]" placeholder="Ex: Toyota Prius 2024" {...field} />
                  </FormControl>
                  <FormDescription>
                Set the Make and Model. Min. 3 Max. 75
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Customer</FormLabel>
                <FormControl>
                  <CustomerSearch 
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                 Search and Select for Customer
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        </FormGroup>  
        <FormGroup title="Vehicle Detail">

          <FormField
            control={form.control}
            name="mileage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mileage</FormLabel>
                <FormControl>
                  <Input type="number" className="w-[200px]" placeholder="Ex: 60000 miles" {...field} />
                </FormControl>
                <FormDescription>
                  Set Mileage
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 mt-4">
            <FormField
              control={form.control}
              name="vinNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vin N.O</FormLabel>
                  <FormControl>
                    <Input className="w-[300px]" placeholder="Ex: 2HGFG21588H705472" {...field} />
                  </FormControl>
                  <FormDescription>
                Set Vin Number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="engineNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Engine N.O</FormLabel>
                  <FormControl>
                    <Input className="w-[300px]" placeholder="Ex: 2HGFG21588H705472" {...field} />
                  </FormControl>
                  <FormDescription>
                    Set Engine Number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                Set the Vehicle Note
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