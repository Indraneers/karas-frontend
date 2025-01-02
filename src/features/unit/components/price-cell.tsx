import { Currency } from "@/components/currency";
import { Product } from "@/features/product/types/product";

interface PriceCellProps {
  product: Product;
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