import { convertBaseUnitQuantityToQuantity } from "../util/convert";
import { ProductRequestDto } from "@/features/product/types/product.dto";

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
        {convertBaseUnitQuantityToQuantity(toBaseUnit, quantity)}
        {' '}({quantity} {product.baseUnit})
      </>
      }
      {
        !product.variable &&
        <>{quantity}</>
      }
    </>
  );
}