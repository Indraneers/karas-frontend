import { Badge } from "@/components/ui/badge";
import { Product } from "@/features/product/types/product";

interface ProductCellProps {
  product: Product
}

export function ProductCell({ product }: ProductCellProps) {
  return <Badge className="bg-accent">{product.name}</Badge>;
}