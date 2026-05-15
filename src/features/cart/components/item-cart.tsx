import { cn } from "@/lib/utils";

interface ItemCartProps {
  className?: string;
  children?: React.ReactNode;
}

export function ItemCart({ className, children }: ItemCartProps) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}

import { Currency } from "@/components/currency";
import { Wrench, X } from "lucide-react";

/**
 * Invoice-style cart row shell. The product/service component owns its
 * own layout below; this just wraps in a hover-able strip and pins the
 * Remove affordance at the top-right.
 */
function CartRow({
  children,
  onClickRemove,
}: {
  children: React.ReactNode;
  onClickRemove?: () => void;
}) {
  return (
    <div className="group relative py-3 border-b border-border/40 last:border-b-0 hover:bg-muted/20 -mx-3 px-3 transition-colors">
      {onClickRemove && (
        <button
          type="button"
          onClick={onClickRemove}
          aria-label="Remove item"
          className="absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="size-3.5" />
        </button>
      )}
      {children}
    </div>
  );
}

/**
 * Pill-shaped grouped input: a static prefix label + an editable input,
 * sharing a single muted background so price + discount visually group
 * together as a related "money" cluster.
 */
function PriceField({
  prefix,
  value,
  onChange,
  className,
}: {
  prefix: string;
  value: number;
  onChange: (next: number) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center bg-foreground/[0.07] rounded-md h-7 text-xs pl-2 pr-1 gap-1",
        className
      )}
    >
      <span className="text-muted-foreground/80 tabular-nums">{prefix}</span>
      <ItemCartCurrencyInput
        className="w-10 bg-transparent border-0 px-0 text-foreground font-medium tabular-nums focus-visible:ring-0"
        prefix=""
        defaultValue={value}
        onValueChange={onChange}
      />
    </div>
  );
}

import { ItemCounter } from "@/components/item-counter";
import { calculateTotalCost, calculateUnitItemTotalCost } from "@/features/sale/utils/sale";
import { usePosStore } from "../../pos/store/pos";
import { Item } from "@/features/sale/types/item";
import { ProductIdentifier } from "@/features/product/components/product-identifier";
import { Box } from "lucide-react";

export function ItemCartUnit({ item }: { item: Item }) {
  const { updateItem, removeItem } = usePosStore();

  const price = item.price;
  const discount = item.discount;
  const qty = item.quantity;
  const product = item.unit.product;
  const unit = item.unit;
  const totalCost = calculateUnitItemTotalCost(price, discount, item);

  return (
    <CartRow onClickRemove={() => removeItem(item?.id || "")}>
      <div className="flex items-start gap-2.5 min-w-0 pr-6">
        <div className="relative shrink-0 w-9 h-9">
          {unit.img ? (
            <img
              className="absolute inset-0 border border-border/60 rounded-md w-full h-full object-cover"
              src={unit.img}
              alt={product.name}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/40 border border-border/60 rounded-md">
              <Box strokeWidth={1.5} className="size-4 text-muted-foreground/70" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <div className="font-medium text-sm text-foreground truncate">
              {product.name}
            </div>
            <div className="font-display tabular-nums text-sm font-medium text-foreground shrink-0">
              <Currency amount={totalCost} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5 truncate">
            {product.identifier && (
              <ProductIdentifier
                className="text-muted-foreground"
                identifier={product.identifier}
              />
            )}
            {product.identifier && unit.name && <span className="text-muted-foreground/40">·</span>}
            <span className="truncate">{unit.name || "Unit"}</span>
          </div>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 pl-[2.875rem]">
        <PriceField
          prefix="$"
          value={price}
          onChange={(value) => updateItem(item.id, { ...item, price: value })}
        />
        <PriceField
          prefix="−$"
          value={discount}
          onChange={(value) => updateItem(item.id, { ...item, discount: value })}
        />
        <div className="ml-auto bg-foreground/[0.07] rounded-md h-7 flex items-center px-0.5">
          <ItemCounter
            className="h-7 w-28 gap-0"
            variable={product.variable}
            baseUnit={product.baseUnit}
            value={qty}
            toBaseUnit={product.variable ? 1000 : unit.toBaseUnit}
            setValue={(value) => updateItem(item.id, { ...item, quantity: value })}
          />
        </div>
      </div>
    </CartRow>
  );
}

import { MaintenanceService } from "@/features/maintenance/types/maintenance-service";

export function ItemCartService({ maintenanceService }: { maintenanceService: MaintenanceService }) {
  const { updateService, removeService } = usePosStore();
  const price = maintenanceService.price;
  const discount = maintenanceService.discount;
  const totalCost = calculateTotalCost(price, discount, 1);

  return (
    <CartRow onClickRemove={() => removeService(maintenanceService.service.id)}>
      <div className="flex items-start gap-2.5 min-w-0 pr-6">
        <div className="flex items-center justify-center w-9 h-9 bg-foreground/[0.06] border border-border/60 rounded-md shrink-0">
          <Wrench strokeWidth={1.5} className="size-4 text-foreground/70" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <div className="font-medium text-sm text-foreground truncate">
              {maintenanceService.service?.name}
            </div>
            <div className="font-display tabular-nums text-sm font-medium text-foreground shrink-0">
              <Currency amount={totalCost} />
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">Service</div>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 pl-[2.875rem]">
        <PriceField
          prefix="$"
          value={price}
          onChange={(value) =>
            updateService(maintenanceService.service.id, { ...maintenanceService, price: value })
          }
        />
        <PriceField
          prefix="−$"
          value={discount}
          onChange={(value) =>
            updateService(maintenanceService.service.id, { ...maintenanceService, discount: value })
          }
        />
      </div>
    </CartRow>
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