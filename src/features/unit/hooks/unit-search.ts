import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { searchUnits } from "../api/unit";
import { UnitResponseDto } from "../types/unit.dto";

/**
 * POS-grade fuzzy search over units, products, identifiers, and subcategory
 * names. Backed by Postgres pg_trgm — typo-tolerant, prefix-friendly,
 * sub-millisecond at this catalogue size.
 */
export function useUnitSearch(initialQuery = "") {
  const [q, setQ] = useState<string>(initialQuery);
  const debouncedQ = useDebounce(q, 200);
  const trimmed = debouncedQ.trim();

  const { isError, isLoading, isFetching, data } = useQuery<UnitResponseDto[]>({
    queryKey: ["unit-search", trimmed],
    queryFn: () => searchUnits(trimmed, 12),
    enabled: trimmed.length >= 1,
    staleTime: 30_000
  });

  return {
    q,
    setQ,
    isLoading: isLoading || isFetching,
    isError,
    data: trimmed.length === 0 ? [] : data ?? []
  };
}
