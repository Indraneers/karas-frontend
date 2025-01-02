import { Badge } from "@/components/ui/badge";
import { Dot } from "lucide-react";
import { Product } from "@/features/product/types/product";

interface ToBaseUnitCellProps {
  product: Product
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