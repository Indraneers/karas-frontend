import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { getUnits } from "../api/unit";
import { toast } from "sonner";

export function useUnitSearch({ productId }: { productId?: string } = {}) {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  const { isError, data } = useQuery({
    queryKey: [
      'units'
      +
      productId ? '-' + productId : ''
      +
      debouncedQ ? '-' + debouncedQ : ''
    ],
    queryFn: () => getUnits({ productId, q: debouncedQ })
  });

  if (isError) {
    toast('error in unit-search');
  }

  return {
    q,
    setQ,
    data,
    isError
  };
}