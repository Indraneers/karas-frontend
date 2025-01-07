import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { getSubcategories } from "../api/subcategory";
import { UseSearch } from "@/types/use-search";
import { SubcategoryResponseDto } from "../types/subcategory.dto";

export function useSubcategorySearch
({ categoryId } : { categoryId?: string } = {}): UseSearch<SubcategoryResponseDto> {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  const { isError, isLoading, data } = useQuery({
    queryKey: ['subcategories', debouncedQ, categoryId],
    queryFn: () => getSubcategories({ q: debouncedQ, categoryId })
  });

  return {
    q,
    setQ,
    isLoading,
    isError,
    data: data?.map(d => ({ ...d, category: { ...d.category, img: d.category.img || '' }, img: d.img || '' }))
  };
}