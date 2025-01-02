import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { FormGroup } from "@/components/form-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product } from "@/features/product/types/product";
import { PrefixedCurrencyInput } from "@/components/prefixed-currency-input";
import { useEffect } from "react";
import { convertUnitFormToUnitDto } from "../util/convert";
import { cn } from "@/lib/utils";
import { UnitRequestDto } from "../types/unit.dto";

export interface UnitForm {
  id: string;
  name: string;
  quantity: number;
  price: string;
  product: Product;
  sku: string;
  toBaseUnit: number;
}

const formSchema = z.object({
  id: z.string(),
  name: z.string({ message: 'Name is required' }).min(2).max(50),
  sku: z.string({ message: 'sku is required' }).min(2).max(50),
  price: z.string(),
  product: z.object({
    id: z.string(),
    name: z.string(),
    categoryId: z.string(),
    variable: z.boolean(),
    baseUnit: z.string()
  }),
  quantity: z.number(),
  productId: z.string({ message: 'Product is required' }),
  toBaseUnit: z.number().int()
});

const defaultData: UnitForm = {
  id: '',
  name: '',
  sku: '',
  price: '',
  quantity: 0,
  product: {
    id: '',
    name: '',
    categoryId: '',
    variable: false,
    baseUnit: ''
  },
  toBaseUnit: 0
};

interface UnitFormProps {
  handleSubmit: (values: UnitRequestDto) => void;
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

  const { getValues } = form;
  const product = getValues().product;

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            name="product"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Product</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    const product = 
                      products.find(p => p.id === value);
                    field.onChange(product);
                  }} 
                  value={field.value.id}>
                  <FormControl>
                    <SelectTrigger className="w-[400px]">
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
          <div className="items-center gap-8 grid grid-cols-3">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      product.variable  &&
                      "Price ($ / " + product.baseUnit + ")"
                    }
                    {
                      !product.variable &&
                      "Price ($)"
                    }
                  </FormLabel>
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
                      Set the unit price in dollar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              className={cn([
                'hidden',
                product.variable && 'block'
              ])}
            >
              <FormField
                control={form.control}
                name="toBaseUnit"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>To Base Unit ({product.baseUnit})</FormLabel>
                    <FormControl>
                      <Input
                        type="number" 
                        {...field} 
                        onChange={event => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      Set the conversion to base unit
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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