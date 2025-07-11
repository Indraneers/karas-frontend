import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { FormGroup } from "@/components/form-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PrefixedCurrencyInput } from "@/components/prefixed-currency-input";
import { useEffect, useState } from "react";
import { convertBaseQuantityToDisplayQuantity, convertQuantityToBaseQuantity, convertUnitFormToUnitDto } from "../util/convert";
import { UnitRequestDto } from "../types/unit.dto";
import { ProductResponseDto } from "@/features/product/types/product.dto";
import { ProductDetailedSearch } from "@/features/product/components/product-detailed-search";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/file";
import { ImageCropperFormField } from "@/components/ui/img-cropper";

export interface UnitForm {
  id: string;
  name: string;
  quantity: number;
  price: number;
  productId: string;
  toBaseUnit: number;
}

const formSchema = z.object({
  id: z.string(),
  name: z.string({ message: 'Name is required' }).min(2).max(50),
  price: z.number(),
  productId: z.string({ message: 'Product is required' }).min(1, 'Product is required'),
  quantity: z.number(),
  toBaseUnit: z.number(),
  file: z.any()
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only SVG and PNG files are allowed"
    })
    .optional()
});

const defaultData: UnitForm = {
  id: '',
  name: '',
  price: 0,
  quantity: 0,
  productId: '',
  toBaseUnit: 1000
};

interface UnitFormProps {
  handleSubmit: ({ unitDto, file } : { unitDto: UnitRequestDto, file?: File }) => void;
  data?: UnitForm | undefined;
}

export function UnitForm({ data = defaultData, handleSubmit = console.log }: UnitFormProps) {
  const navigate = useNavigate();
  const router = useRouter();

  const [product, setProduct] = useState<ProductResponseDto>({
    variable: false,
    id: '',
    name: '',
    identifier: '',
    subcategory: {
      id: '',
      name: '',
      categoryId: '',
      color: ''
    },
    unitCount: 0,
    baseUnit: ''
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { file, ...unit } = values;
    const unitDto = convertUnitFormToUnitDto(unit, product.variable);
    handleSubmit({ unitDto, file });
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
                    <Input placeholder="Ex: Bottle, Drum, Box, etc" {...field} />
                  </FormControl>
                  <FormDescription>
                Set the unit name. Min. 3 Max. 50
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
                <FormLabel>Select Product</FormLabel>
                <ProductDetailedSearch
                  value={field.value}
                  onChange={field.onChange}
                  onEntityChange={setProduct}
                  placeholder='Search for products'
                  entityName='product'
                />
                <FormDescription>
                  Select the product that this unit belongs to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <ImageCropperFormField 
            form={form}
            name="file"
            label="Set POS Icon"
            className="mt-6"
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

            <FormField
              control={form.control}
              name="toBaseUnit"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>To Base Unit { product.baseUnit && `(${ product.baseUnit })` }</FormLabel>
                    <FormControl>
                      <Input
                        {...field} 
                        type="number" 
                        value={convertBaseQuantityToDisplayQuantity(field.value)}
                        onChange={event => field.onChange(convertQuantityToBaseQuantity(1000, +event.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                        Set the conversion to base unit
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
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