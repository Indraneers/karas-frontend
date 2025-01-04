import { getProducts } from "@/features/product/api/product";
import { UseSearch } from "@/types/use-search";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { ProductResponseDto } from "../types/product.dto";

export function useProductSearch
({ categoryId }: { categoryId?: string } = {}): UseSearch<ProductResponseDto> {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  
  const { isError, isLoading, data } = useQuery({
    queryKey: ['products'
      + 
      (debouncedQ ? ('-' + debouncedQ) : '')
      + 
      (categoryId ? ('-' + categoryId) : '')
    ],
    queryFn: () => getProducts({ categoryId: categoryId, q: debouncedQ })
  });

  return { 
    q,
    setQ,
    isLoading,
    isError,
    data
  };
}