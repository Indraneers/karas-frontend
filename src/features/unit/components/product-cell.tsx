import { Badge } from "@/components/ui/badge";
import { ProductRequestDto } from "@/features/product/types/product.dto";

interface ProductCellProps {
  product: ProductRequestDto
}

export function ProductCell({ product }: ProductCellProps) {
  return <Badge className="bg-accent">{product.name}</Badge>;
}