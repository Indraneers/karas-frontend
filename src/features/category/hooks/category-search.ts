import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { getCategories } from "../api/category";
import { UseSearch } from "@/types/use-search";
import { CategoryDto } from "../types/category.dto";

export function useCategorySearch(): UseSearch<CategoryDto> {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  const { isError, isLoading, data } = useQuery({
    queryKey: ['categories', debouncedQ],
    queryFn: () => getCategories({ q: debouncedQ })
  });

  return {
    q,
    setQ,
    isLoading,
    isError,
    data
  };
}