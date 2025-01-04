import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { getUnits } from "../api/unit";
import { toast } from "sonner";
import { UseSearch } from "@/types/use-search";
import { UnitResponseDto } from "../types/unit.dto";

export function useUnitSearch({ productId }: { productId?: string } = {}): UseSearch<UnitResponseDto> {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  const { isError, isLoading, data } = useQuery({
    queryKey: [
      'units'
      +
      (productId ? ('-' + productId) : '')
      +
      (debouncedQ ? ('-' + debouncedQ) : '')
    ],
    queryFn: () => getUnits({ productId, q: debouncedQ })
  });

  if (isError) {
    toast('error in unit-search');
  }

  console.log(debouncedQ, data);

  return {
    q,
    setQ,
    data,
    isError,
    isLoading
  };
}