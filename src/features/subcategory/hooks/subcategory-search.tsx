import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { getSubcategories } from "../api/subcategory";

export function useSubcategorySearch() {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  const { isError, data } = useQuery({
    queryKey: ['subcategories', debouncedQ],
    queryFn: () => getSubcategories({ q: debouncedQ })
  });

  return {
    q,
    setQ,
    isError,
    data
  };
}