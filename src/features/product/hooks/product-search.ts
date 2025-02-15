import { getProducts } from "@/features/product/api/product";
import { UseSearch } from "@/types/use-search";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { ProductResponseDto } from "../types/product.dto";

export function useProductSearch
({ subcategoryId }: { subcategoryId?: string } = {}): UseSearch<ProductResponseDto> {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  
  const { isError, isLoading, data } = useQuery({
    queryKey: ['products', debouncedQ, subcategoryId],
    queryFn: () => getProducts({ subcategoryId: subcategoryId, q: debouncedQ })
  });

  return { 
    q,
    setQ,
    isLoading,
    isError,
    data
  };
}