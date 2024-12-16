import { Badge } from "@/components/ui/badge";
import { getProductById } from "@/features/product/api/product";
import { useQuery } from "@tanstack/react-query";

interface ProductCellProps {
  productId: string;
}

export function ProductCell({ productId }: ProductCellProps) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['product-' + productId],
    queryFn: async () => await getProductById(productId)
  });

  if (isError) {
    return 'error';
  }

  if (isLoading) {
    return 'loading';
  }

  if (!data) {
    return '';
  }

  return <Badge className="bg-accent">{data?.name}</Badge>;
}