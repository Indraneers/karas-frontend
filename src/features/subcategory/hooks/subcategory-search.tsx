import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { getSubcategories } from "../api/subcategory";
import { UseSearch } from "@/types/use-search";
import { SubcategoryResponseDto } from "../types/subcategory.dto";

export function useSubcategorySearch(): UseSearch<SubcategoryResponseDto> {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  const { isError, isLoading, data } = useQuery({
    queryKey: ['subcategories', debouncedQ],
    queryFn: () => getSubcategories({ q: debouncedQ })
  });

  return {
    q,
    setQ,
    isLoading,
    isError,
    data
  };
}