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