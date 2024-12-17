import { getProductById } from "@/features/product/api/product";
import { useQuery } from "@tanstack/react-query";

export function ProductCell({ productId } : { productId: string }) {
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

  return data?.name;
}