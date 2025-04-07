import { Badge } from "@/components/ui/badge";
import { ProductRequestDto } from "@/features/product/types/product.dto";
import { cn } from "@/lib/utils";

interface ProductCellProps {
  product: ProductRequestDto
}

export function ProductCell({ product }: ProductCellProps) {
  return (
    <div className="flex gap-1">
      <Badge className="bg-accent">{product.name}</Badge>
      <Badge 
        variant='outline'
        className={cn([
          "border-amber-500 hidden uppercase text-amber-600",
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

import { convertBaseQuantityToQuantity } from "../util/convert";

interface UnitQuantityCellProps {
  product: ProductRequestDto;
  quantity: number;
  toBaseUnit: number;
}

export function UnitQuantityCell({ product, quantity, toBaseUnit }: UnitQuantityCellProps) {
  return (
    <>
      {product.variable && 
      <>
        {convertBaseQuantityToQuantity(toBaseUnit, quantity)} Qty
        {' '}({quantity} {product.baseUnit})
      </>
      }
      {
        !product.variable &&
        <>{quantity} Qty</>
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
      {product.variable && 
      <div className="flex items-center">
        {toBaseUnit}
        <span><Dot /></span> 
        <Badge className="border-primary text-primary" variant='outline'>1{product.baseUnit}</Badge>
      </div>
      }
      {
        !product.variable && "N/A"
      }
    </>
  );
}

import { Product } from "@/features/product/types/product";

interface BaseUnitQuantityCellProps {
  product: Product
  quantity: number;
}

export function BaseUnitQuantityCell({ product, quantity }: BaseUnitQuantityCellProps) {
  return (
    <>
      {product.variable && 
      <Badge variant='outline'>
        {quantity}{product.baseUnit}
      </Badge>
      }
      {
        !product.variable && "N/A"
      }
    </>
  );
}