import { TypographyH3 } from "@/components/ui/typography/h3";
import { cn } from "@/lib/utils";

interface ItemCartProps {
  className?: string;
  children?: React.ReactNode;
}

export function ItemCart({ className, children } : ItemCartProps) {
  return (

    <div className={cn([
      'overflow-hidden flex flex-col min-h-40',
      className
    ])}>
      <TypographyH3>
        Item Cart
      </TypographyH3>
      <div className="relative flex-grow mt-2 h-full">
        <div className="absolute inset-0 flex flex-col gap-3 p-1 overflow-scroll">
          { children }
        </div>
      </div>
    </div>
  );
}

import { Currency } from "@/components/currency";
import { Button } from "@/components/ui/button";
import { ProductRequestDto } from "@/features/product/types/product.dto";
import { Box, X } from "lucide-react";
import { MouseEventHandler } from "react";

interface ItemCartItemProps {
  children?: React.ReactNode;
  product?: ProductRequestDto;
  totalCost: number;
  onClickRemove?: MouseEventHandler<HTMLButtonElement>;
  img?: string;
  isService?: boolean;
}

export function ItemCartItem
({ children, totalCost, onClickRemove, img, isService = false }: ItemCartItemProps) {
  return (
    <div className={cn([
      "relative border border-primary bg-accent rounded-lg"
    ])}>
      <Button
        onClick={onClickRemove}
        className="top-[-0.5rem] left-[-0.5rem] absolute hover:bg-primary/80 border w-5 h-5" 
        size='icon'>
        <X className="!w-3 !h-3" />
      </Button>
      <div className="rounded-t-lg w-full h-full overflow-hidden">
        <div className="flex flex-col items-center h-full">
          <div className="flex gap-2 bg-surface p-2 rounded-t-lg w-full">
            <div className={cn([
              "relative h-full aspect-square",
              isService && 'hidden'
            ])}>
              {
                img ?
                  <img className='absolute inset-0 border border-border rounded-lg' src={img} />
                  :
                  <Box strokeWidth={1} className="absolute inset-0 p-2 border rounded-lg w-full h-full" />
              }
            </div>
            <div className={cn([
              'w-full'
            ])} >
              {children}
            </div>
          </div>
          <div className="place-content-center grid py-1 font-medium text-background text-xs">
            <Currency amount={totalCost} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { ItemCounter } from "@/components/item-counter";
import { calculateTotalCost, calculateUnitItemTotalCost } from "@/features/sale/utils/sale";
import { usePosStore } from "../../pos/store/pos";
import { Item } from "@/features/sale/types/item";
import { ProductIdentifier } from "@/features/product/components/product-identifier";

export function ItemCartUnit({ item }: { item: Item }) {
  const { updateItem, removeItem } = usePosStore();

  const price = item.price;
  const discount = item.discount;
  const qty = item.quantity;

  const product = item.unit.product;
  const unit = item.unit;

  const totalCost = calculateUnitItemTotalCost(price, discount, item);
  return (
    <ItemCartItem 
      img={unit.img}
      product={item.unit.product}
      totalCost={totalCost} 
      onClickRemove={() => removeItem(item?.id || '')}
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-col flex-grow justify-between h-full">
          {/* Unit Name, Product and SKU */}
          <div className="flex lg:flex-row flex-col justify-between justify-items-start lg:items-center lg:gap-2">
            <div className="font-medium text-xs lg:text-sm">
              {product.name}
            </div>
            <div className="self-start font-semibold text-xs">
              {item.unit.name || ''}
            </div>
          </div>
          <div className="flex justify-between items-center min-h-4">
            <ProductIdentifier className="text-xs" identifier={product.identifier} />
          </div>
          {/* Price, discount and quantity */}
          <div className="flex lg:flex-row flex-col justify-between items-center gap-2 lg:gap-4 mt-4 lg:mt-2">
            <div className="flex gap-4 lg:gap-2">
              <ItemCartCurrencyInput 
                className="lg:w-12"
                prefix="$"
                defaultValue={price}
                onValueChange={(value) => updateItem(item.id, { ...item, price: value })}
              />
              <ItemCartCurrencyInput 
                className="lg:w-12"
                prefix="-$"
                defaultValue={discount}
                onValueChange={(value) => updateItem(item.id, { ...item, discount: value })}
              />
            </div>
            <ItemCounter
              className="lg:w-32 h-6"
              variable={product.variable}
              baseUnit={product.baseUnit}
              value={qty}
              toBaseUnit={product.variable ? 1000 : unit.toBaseUnit}
              setValue={(value) => updateItem(item.id, { ...item, quantity: value })}
            />
          </div>
        </div>  
      </div>
    </ItemCartItem>
  );
}

import { MaintenanceService } from "@/features/maintenance/types/maintenance-service";

export function ItemCartService({ maintenanceService } : { maintenanceService: MaintenanceService }) {
  const { updateService, removeService } = usePosStore();
  const price = maintenanceService.price;
  const discount = maintenanceService.discount;
  const totalCost = calculateTotalCost(price, discount, 1);

  return (
    <ItemCartItem 
      totalCost={totalCost} 
      onClickRemove={() => removeService(maintenanceService.service.id)}
      isService={true}
    >
      <div className="flex flex-col gap-3">
        <div className="flex-grow self-start font-medium text-md">
          {maintenanceService.service?.name}
        </div>
        <div className="flex justify-between">
          <div className="self-end text-foreground/50 text-xs">
            Service Check
          </div>
          <div className="flex gap-2">
            <ItemCartCurrencyInput 
              className="w-14"
              prefix="$"
              defaultValue={price}
              onValueChange={(value) => updateService(maintenanceService.service.id, { ...maintenanceService, price: value })}
            />
            <ItemCartCurrencyInput 
              className="w-14"
              prefix="-$"
              defaultValue={discount}
              onValueChange={(value) => updateService(maintenanceService.service.id, { ...maintenanceService, discount: value })}
            />
          </div>
        </div>
      </div>
    </ItemCartItem>
  );
}

import * as React from "react";

import CurrencyInput from "react-currency-input-field";
import { toastError } from "@/lib/toast";
import { convertCurrencyStringToRawCurrency, convertRawCurrencyToCurrencyString } from "@/features/currency/utils/currency";
import { GenericCurrencyInputProps } from "@/features/currency/types/generic-currency-input-props";

const ItemCartCurrencyInput = React.forwardRef<HTMLInputElement, GenericCurrencyInputProps>(
  ({ className, value, defaultValue, onValueChange, type, prefix, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string | undefined>(
      convertRawCurrencyToCurrencyString(defaultValue || 0) || ''
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(convertRawCurrencyToCurrencyString(Number(value)));
      }
    }, [value]);

    const handleChange = (val: string | undefined) => {
      setInternalValue(val);

      if (!val) return;

      const rawValue = convertCurrencyStringToRawCurrency(val);
      if (rawValue < 0) {
        toastError("Currency can't be negative");
        return;
      }

      if (onValueChange) {
        onValueChange(rawValue);
      }
    };

    return (
      <div className={cn([
        "flex items-center bg-gray-200/75 px-1 rounded-sm",
        className
      ])}>
        <span className="text-xs">{prefix}</span>
        <CurrencyInput
          className={cn([
            'flex w-full',
            "border-0 bg-transparent h-6 py-1 m-0 text-sm text-center focus:outline-none"
          ])}
          value={internalValue}
          type={type}
          ref={ref}
          disableGroupSeparators
          onValueChange={handleChange}
          allowDecimals
          allowNegativeValue={false}
          {...props}
        />
      </div>
    );
  }
);
ItemCartCurrencyInput.displayName = "ItemCartCurrencyInput";