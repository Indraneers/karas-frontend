import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { FormGroup } from "@/components/form-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/types/product";
import { UnitDto } from "../types/unit.dto";
import { PrefixedCurrencyInput } from "@/components/prefixed-currency-input";
import { useEffect } from "react";
import { convertUnitFormToUnitDto } from "../util/convert";

export interface UnitForm {
  id: string;
  name: string;
  quantity: number;
  price: string;
  product?: Product;
  productId: string;
  sku: string;
}

const formSchema = z.object({
  id: z.string(),
  name: z.string({ message: 'Name is required' }).min(2).max(50),
  sku: z.string({ message: 'Name is required' }).min(2).max(50),
  price: z.string(),
  quantity: z.number(),
  productId: z.string({ message: 'Product is required' })
});

const defaultData: UnitForm = {
  id: '',
  name: '',
  sku: '',
  price: '',
  quantity: 0,
  productId: ''
};

interface UnitFormProps {
  handleSubmit: (values: UnitDto) => void;
  data?: UnitForm | undefined;
  products: Product[];
}

export function UnitForm({ data = defaultData, handleSubmit = console.log, products }: UnitFormProps) {
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.id = '';
    const unitDto = convertUnitFormToUnitDto(values);
    handleSubmit(unitDto);  
    form.reset();
    navigate({ to: '/inventory/units', replace: true });
    router.invalidate();
  }

  useEffect(() => {
    form.reset(data);
  }, [data, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormGroup title="General Information">
          <div className='gap-8 grid grid-cols-3'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 1L, 2L, 1 Drum" {...field} />
                  </FormControl>
                  <FormDescription>
                Set the unit name. Min. 3 Max. 50
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit/Product SKU</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: TWISTER-80W20-1L" {...field} />
                  </FormControl>
                  <FormDescription>
                    Set the SKU
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Product</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    { products.map((p) => (
                      <SelectItem value={p.id} key={p.id}>
                        {p.name}
                      </SelectItem>
                    ))
                    }
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the product that this unit belongs to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormGroup>
        <FormGroup title="Stock Information (Quantity and Price)">
          <div className="gap-8 grid grid-cols-3">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Price ($)</FormLabel>
                  <FormControl>
                    <PrefixedCurrencyInput
                      defaultValue={field.value}
                      disableGroupSeparators
                      onValueChange={(value) => {
                        field.onChange(value); 
                      }}  
                    />
                  </FormControl>
                  <FormDescription>
                      Set the unit price in dollar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Unit Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number" 
                      {...field} 
                      onChange={event => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                      Set the initial quantity
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormGroup>
        <Button
          className="bg-green-500 hover:bg-green-600 text-white"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}