import { Badge } from "@/components/ui/badge";
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