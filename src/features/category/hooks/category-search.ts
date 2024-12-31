import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { getCategories } from "../api/category";

export function useCategorySearch() {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  const { isError, data } = useQuery({
    queryKey: ['categories', debouncedQ],
    queryFn: () => getCategories({ q: debouncedQ })
  });

  return {
    q,
    setQ,
    isError,
    data
  };
}