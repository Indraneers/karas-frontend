import { Currency } from "@/components/currency";
import { ProductRequestDto } from "@/features/product/types/product.dto";

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