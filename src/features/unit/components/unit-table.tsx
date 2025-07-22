import { Badge } from "@/components/ui/badge";
import { ProductRequestDto } from "@/features/product/types/product.dto";
import { cn } from "@/lib/utils";

interface ProductCellProps {
  product: ProductRequestDto
}

export function ProductCell({ product }: ProductCellProps) {
  return (
    <div className="flex gap-1">
      <Badge variant='info-primary'>{product.name}</Badge>
      <Badge 
        variant='info-amber'
        className={cn([
          "hidden",
          product.identifier && 'inline-flex'
        ])}>
        {product.identifier}
      </Badge>
    </div>
  );
}

import { Currency } from "@/components/currency";

interface PriceCellProps {
  product: ProductRequestDto;
  price: number;
}

export function PriceCell({ product, price }: PriceCellProps) {
  return (
    <>
      {product.variable && 
      <>
        <Currency amount={price} /> / {product.baseUnit}
      </>
      }
      {
        !product.variable &&
        <Currency amount={price} />
      }
    </>
  );
}

import { convertBaseQuantityToDisplayQuantity, convertVariableQuantityToDiscreteQuantity, convertVariableQuantityToDisplayQuantity } from "../util/convert";

interface UnitQuantityCellProps {
  product: ProductRequestDto;
  quantity: number;
  toBaseUnit: number;
}

export function UnitQuantityCell({ product, quantity, toBaseUnit }: UnitQuantityCellProps) {
  return (
    <>
      {
        product.variable &&
      <>
        {convertVariableQuantityToDiscreteQuantity(toBaseUnit, quantity)} Qty
        {' '}({convertVariableQuantityToDisplayQuantity(quantity)}{product.baseUnit})
      </>
      }
      {
        !product.variable &&
      <>{convertVariableQuantityToDiscreteQuantity(toBaseUnit, quantity)} Qty</>
      }
    </>
  );
}

import { Dot } from "lucide-react";

interface ToBaseUnitCellProps {
  product: ProductRequestDto
  toBaseUnit: number;
}

export function ToBaseUnitCell({ product, toBaseUnit }: ToBaseUnitCellProps) {
  return (
    <>
      {product.baseUnit
        && 
        <div className="flex items-center">
          {convertBaseQuantityToDisplayQuantity(toBaseUnit)}
          <span><Dot /></span> 
          <Badge className="border-primary text-primary" variant='outline'>1{product.baseUnit}</Badge>
        </div>
      }
      {
        !product.baseUnit && "N/A"
      }
    </>
  );
}