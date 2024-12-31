import { getProducts } from "@/features/product/api/product";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export function useProductSearch
({ categoryId }: { categoryId?: string } = {}) {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  
  const { isError, data } = useQuery({
    queryKey: ['products'
      + 
      debouncedQ ? '-' + debouncedQ : ''
      + 
      categoryId ? '-' + categoryId : ''
    ],
    queryFn: () => getProducts({ categoryId: categoryId, q: debouncedQ })
  });

  return { 
    q,
    setQ,
    isError,
    data
  };
}