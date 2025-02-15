import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { getUnits } from "../api/unit";
import { toast } from "sonner";
import { UseSearch } from "@/types/use-search";
import { UnitResponseDto } from "../types/unit.dto";

export function useUnitSearch({ productId, isEnabled = false }: { productId?: string, isEnabled?: boolean } = {}): UseSearch<UnitResponseDto> {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  const { isError, isLoading, data } = useQuery({
    queryKey: [
      'units', debouncedQ, productId
    ],
    queryFn: () => getUnits({ productId, q: debouncedQ }),
    enabled: isEnabled ? !!q : true
  });

  if (isError) {
    toast('error in unit-search');
  }

  return {
    q,
    setQ,
    data,
    isError,
    isLoading
  };
}