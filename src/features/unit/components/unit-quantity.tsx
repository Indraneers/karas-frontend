import { Product } from "@/features/product/types/product";

interface UnitQuantityCellProps {
  product: Product;
  quantity: number;
  toBaseUnit: number;
}

export function UnitQuantityCell({ product, quantity, toBaseUnit }: UnitQuantityCellProps) {
  return (
    <>
      {product.variable && 
      <>
        {quantity / toBaseUnit}
      </>
      }
      {
        !product.variable &&
        <>{quantity}</>
      }
    </>
  );
}