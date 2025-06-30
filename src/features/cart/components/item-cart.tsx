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
      <TypographyH3 className="text-base sm:text-lg">
        Item Cart
      </TypographyH3>
      <div className="relative flex-grow mt-2 h-full">
        <div className="absolute inset-0 flex flex-col gap-2 sm:gap-3 pt-1.5 pl-1.5 overflow-scroll">
          { children }
        </div>
      </div>
    </div>
  );
}

import { Currency } from "@/components/currency";
import { Button } from "@/components/ui/button";
import { ProductRequestDto } from "@/features/product/types/product.dto";
import { Box, Wrench, X } from "lucide-react";
import { MouseEventHandler } from "react";

interface ItemCartItemProps {
  children?: React.ReactNode;
  product?: ProductRequestDto;
  totalCost: number;
  onClickRemove?: MouseEventHandler<HTMLButtonElement>;
}

export function ItemCartItem
({ children, totalCost, onClickRemove }: ItemCartItemProps) {
  return (
    <div className={cn([
      "relative border border-accent bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
    ])}>
      <Button
        onClick={onClickRemove}
        className="top-[-0.5rem] left-[-0.5rem] absolute hover:bg-primary/80 border w-5 h-5" 
        size='icon'>
        <X className="!w-3 !h-3" />
      </Button>
      <div className="rounded-xl w-full h-full overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="bg-gradient-to-br from-surface/50 to-surface/80 p-2 rounded-t-xl w-full">
            {children}
          </div>
          <div className="bg-primary px-3 py-2 rounded-b-xl font-semibold text-primary-foreground text-sm text-center">
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
      product={item.unit.product}
      totalCost={totalCost} 
      onClickRemove={() => removeItem(item?.id || '')}
    >
      <div className="flex flex-col gap-3 min-w-0">
        {/* Header with Image and Product Info */}
        <div className="flex items-start gap-3">
          {/* Product Image */}
          <div className="relative flex-shrink-0 w-12 sm:w-14 h-12 sm:h-14">
            {unit.img ? (
              <img 
                className="absolute inset-0 border border-border rounded-lg w-full h-full object-cover" 
                src={unit.img} 
                alt={product.name}
              />
            ) : (
              <div className="absolute inset-0 flex justify-center items-center bg-muted/30 border border-border rounded-lg">
                <Box strokeWidth={1} className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="flex flex-col flex-1 justify-between min-w-0">
            <div className="flex flex-col gap-0.5">
              <div className="font-semibold text-xs lg:text-sm xl:text-base break-words leading-tight">
                {product.name}
              </div>
              <div className="flex justify-between">
                <ProductIdentifier 
                  className="text-muted-foreground text-xs" 
                  identifier={product.identifier} 
                />
                <Badge variant='info-orange' className="ml-auto p-0 px-2 text-xs text-right">
                  {unit.name || 'Unit'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex lg:flex-row flex-col justify-between items-center gap-2 lg:gap-4">
          <div className="flex gap-4 lg:gap-2">
            <ItemCartCurrencyInput 
              className="lg:w-16"
              prefix="$"
              defaultValue={price}
              onValueChange={(value) => updateItem(item.id, { ...item, price: value })}
            />
            <ItemCartCurrencyInput 
              className="lg:w-16"
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
    >
      <div className="flex flex-col gap-3 min-w-0">
        {/* Service Header */}
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0 w-12 sm:w-14 h-12 sm:h-14">
            <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 border border-accent rounded-lg">
              <div className="flex justify-center items-center w-6 h-6">
                <span className="font-bold text-blue-500 text-xs"><Wrench /></span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col flex-1 justify-between min-w-0 h-12 sm:h-14">
            <div className="flex flex-col gap-0.5">
              <div className="font-semibold text-sm sm:text-base break-words leading-tight">
                {maintenanceService.service?.name}
              </div>
              <div className="font-medium text-blue-600 text-xs">
                Service Check
              </div>
            </div>
          </div>
        </div>
        
        {/* Service Controls */}
        <div className="flex gap-2">
          <ItemCartCurrencyInput 
            className="w-16"
            prefix="$"
            defaultValue={price}
            onValueChange={(value) => updateService(maintenanceService.service.id, { ...maintenanceService, price: value })}
          />
          <ItemCartCurrencyInput 
            className="w-16"
            prefix="-$"
            defaultValue={discount}
            onValueChange={(value) => updateService(maintenanceService.service.id, { ...maintenanceService, discount: value })}
          />
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
import { Badge } from "@/components/ui/badge";

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